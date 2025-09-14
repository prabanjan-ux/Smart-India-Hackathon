import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    difficulty: 'Medium',
    description: '',
    instructions: '',
    timeLimit: 3,
    ageGroup: '8-12',
    content: null
  });

  const [quizQuestions, setQuizQuestions] = useState([
    {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }
  ]);

  const [wordPuzzleWords, setWordPuzzleWords] = useState(['', '', '', '', '']);
  const [dragDropItems, setDragDropItems] = useState([
    { id: '1', text: '', category: '' },
    { id: '2', text: '', category: '' },
    { id: '3', text: '', category: '' },
    { id: '4', text: '', category: '' },
  ]);
  const [dragDropCategories, setDragDropCategories] = useState(['', '']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuizQuestionChange = (index, field, value) => {
    const updated = [...quizQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setQuizQuestions(updated);
  };

  const handleQuizOptionChange = (qIndex, oIndex, value) => {
    const updated = [...quizQuestions];
    updated[qIndex].options[oIndex] = value;
    setQuizQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...quizQuestions];
    updated[qIndex].correctAnswer = value;
    setQuizQuestions(updated);
  };

  const addQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]);
  };

  const removeQuizQuestion = (index) => {
    if (quizQuestions.length > 1) {
      setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
    }
  };

  const handleWordChange = (index, value) => {
    const updated = [...wordPuzzleWords];
    updated[index] = value;
    setWordPuzzleWords(updated);
  };

  const addWord = () => setWordPuzzleWords([...wordPuzzleWords, '']);
  const removeWord = (index) => {
    if (wordPuzzleWords.length > 1) {
      setWordPuzzleWords(wordPuzzleWords.filter((_, i) => i !== index));
    }
  };

  const handleDragDropItemChange = (index, field, value) => {
    const updated = [...dragDropItems];
    updated[index] = { ...updated[index], [field]: value };
    setDragDropItems(updated);
  };

  const addDragDropItem = () => {
    setDragDropItems([
      ...dragDropItems,
      { id: `${dragDropItems.length + 1}`, text: '', category: '' }
    ]);
  };

  const removeDragDropItem = (index) => {
    if (dragDropItems.length > 1) {
      setDragDropItems(dragDropItems.filter((_, i) => i !== index));
    }
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...dragDropCategories];
    updated[index] = value;
    setDragDropCategories(updated);
  };

  const addCategory = () => setDragDropCategories([...dragDropCategories, '']);
  const removeCategory = (index) => {
    if (dragDropCategories.length > 1) {
      setDragDropCategories(dragDropCategories.filter((_, i) => i !== index));
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.type) {
      alert('Please select a game type');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    let gameContent;

    switch (formData.type) {
      case 'Quiz':
        gameContent = quizQuestions;
        break;
      case 'Word Puzzle':
        gameContent = wordPuzzleWords;
        break;
      case 'Drag and Drop':
        gameContent = { items: dragDropItems, categories: dragDropCategories };
        break;
      default:
        gameContent = {};
    }

    const finalGameData = {
      ...formData,
      content: gameContent,
      dateCreated: new Date().toISOString().split('T')[0]
    };

    console.log('Submitting game:', finalGameData);
    alert('Game created successfully!');
    navigate('/teacher/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">
          Create New Educational Game
        </h1>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8">
          {['Basic Info', 'Game Content', 'Review & Submit'].map((label, i) => (
            <React.Fragment key={i}>
              <div className={`flex flex-col items-center ${step >= i + 1 ? 'text-eco-primary' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= i + 1 ? 'bg-eco-primary text-white' : 'bg-gray-200'}`}>
                  {i + 1}
                </div>
                <span className="mt-2">{label}</span>
              </div>
              {i < 2 && (
                <div className="flex-1 h-0.5 self-center">
                  <div className={`h-0.5 ${step > i + 1 ? 'bg-eco-primary' : 'bg-gray-200'}`}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* === STEP 1 === */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Game Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                />
              </div>

              {/* Game Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Game Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                >
                  <option value="">Select a game type</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Word Puzzle">Word Puzzle</option>
                  <option value="Drag and Drop">Drag and Drop</option>
                  <option value="Memory Match">Memory Match</option>
                  <option value="Crossword">Crossword</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                >
                  <option value="5-7">5-7 years</option>
                  <option value="8-12">8-12 years</option>
                  <option value="13-15">13-15 years</option>
                  <option value="16+">16+ years</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                />
              </div>

              {/* Time Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (minutes)</label>
                <input
                  type="number"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-eco-primary"
                />
              </div>
            </div>
          )}

          {/* === STEP 2 === */}
          {step === 2 && (
            <div>
              {/* Quiz */}
              {formData.type === 'Quiz' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold text-eco-dark">Create Quiz Questions</h2>
                  {quizQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium">Question {qIndex + 1}</h3>
                        <button type="button" onClick={() => removeQuizQuestion(qIndex)} className="text-red-500">
                          Remove
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Question Text"
                        value={q.text}
                        onChange={(e) => handleQuizQuestionChange(qIndex, 'text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                      />

                      <label className="block text-sm font-medium mb-2">Options</label>
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                            className="mr-2"
                          />
                          <input
                            type="text"
                            placeholder={`Option ${oIndex + 1}`}
                            value={opt}
                            onChange={(e) => handleQuizOptionChange(qIndex, oIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuizQuestion}
                    className="px-4 py-2 border border-eco-primary text-eco-primary rounded-md hover:bg-eco-primary hover:text-white"
                  >
                    Add Question
                  </button>
                </div>
              )}

              {/* Word Puzzle */}
              {formData.type === 'Word Puzzle' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-eco-dark">Add Puzzle Words</h2>
                  {wordPuzzleWords.map((word, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={word}
                        onChange={(e) => handleWordChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder={`Word ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeWord(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addWord}
                    className="px-4 py-2 border border-eco-primary text-eco-primary rounded-md hover:bg-eco-primary hover:text-white"
                  >
                    Add Word
                  </button>
                </div>
              )}

              {/* Drag & Drop */}
              {formData.type === 'Drag and Drop' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-eco-dark">Categories</h2>
                  {dragDropCategories.map((cat, i) => (
                    <div key={i} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={cat}
                        onChange={(e) => handleCategoryChange(i, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder={`Category ${i + 1}`}
                      />
                      <button type="button" onClick={() => removeCategory(i)} className="text-red-500">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCategory}
                    className="px-4 py-2 border border-eco-primary text-eco-primary rounded-md hover:bg-eco-primary hover:text-white"
                  >
                    Add Category
                  </button>

                  <h2 className="text-xl font-semibold text-eco-dark mt-8">Items</h2>
                  {dragDropItems.map((item, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-md mb-4">
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => handleDragDropItemChange(i, 'text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        placeholder="Item Name"
                      />
                      <select
                        value={item.category}
                        onChange={(e) => handleDragDropItemChange(i, 'category', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Category</option>
                        {dragDropCategories.filter(c => c.trim()).map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                      <button type="button" onClick={() => removeDragDropItem(i)} className="text-red-500 mt-2">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDragDropItem}
                    className="px-4 py-2 border border-eco-primary text-eco-primary rounded-md hover:bg-eco-primary hover:text-white"
                  >
                    Add Item
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === STEP 3 === */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-eco-dark">Review Your Game</h2>
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Type:</strong> {formData.type}</p>
              <p><strong>Description:</strong> {formData.description}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-secondary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-secondary"
              >
                Create Game
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
