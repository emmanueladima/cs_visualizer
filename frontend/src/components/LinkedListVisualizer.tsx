import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  data: number;
  next: number | null;
}

interface LinkedListProps {
  darkMode: boolean;
}

const LinkedListVisualizer: React.FC<LinkedListProps> = ({ darkMode }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [newValue, setNewValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/linkedlist');
      const data = await response.json();
      if (data.status === 'success') {
        setNodes(data.data);
      }
    } catch (error) {
      setError('Failed to fetch list');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleInsert = async (position: 'start' | 'end') => {
    if (!newValue.trim() || isNaN(Number(newValue))) {
      setError('Please enter a valid number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/linkedlist/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: Number(newValue),
          position,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setNodes(data.data);
        setNewValue('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to insert node');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (value: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/linkedlist/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setNodes(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to delete node');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Linked List Visualization
      </h2>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter a number"
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={() => handleInsert('start')}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Insert at Start
          </button>
          <button
            onClick={() => handleInsert('end')}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Insert at End
          </button>
        </div>
        {error && (
          <div className="text-red-500">
            {error}
          </div>
        )}
      </div>

      {/* Linked List Visualization */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        <AnimatePresence>
          {nodes.map((node, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => handleDelete(node.data)}
                  className="mb-2 text-xs text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <div 
                  className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}
                    border-2 border-blue-600
                    transition-colors duration-200
                  `}
                >
                  {node.data}
                </div>
              </motion.div>
              {node.next !== null && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className={`w-8 h-0.5 transform origin-left ${darkMode ? 'bg-blue-600' : 'bg-blue-400'}`} 
                />
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;