import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

function CustomizeSections({ sectionOrder, setSectionOrder, sectionTitles, setSectionTitles }) {
  const navigate = useNavigate();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(sectionOrder);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSectionOrder(reordered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-50 text-gray-800">
      <header className="bg-purple-300 text-purple-900 shadow p-4 text-center font-bold text-2xl">
        Customize Sections
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Reorder and Rename Sections</h2>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="section-customizer">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sectionOrder.map((section, index) => (
                    <Draggable key={section} draggableId={section} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-purple-100 p-4 rounded shadow mb-4 flex items-center justify-between gap-4"
                        >
                          {/* Drag Handle Icon */}
                          <div {...provided.dragHandleProps} className="cursor-grab text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="5" cy="5" r="1.5" />
                              <circle cx="5" cy="10" r="1.5" />
                              <circle cx="5" cy="15" r="1.5" />
                              <circle cx="10" cy="5" r="1.5" />
                              <circle cx="10" cy="10" r="1.5" />
                              <circle cx="10" cy="15" r="1.5" />
                            </svg>
                          </div>

                          {/* Editable Input for Title */}
                          <input
                            type="text"
                            value={sectionTitles[section]}
                            onChange={(e) =>
                              setSectionTitles({ ...sectionTitles, [section]: e.target.value })
                            }
                            className="flex-grow border border-gray-300 p-2 rounded"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Back Button */}
          <div className="mt-6 text-right">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Back to Resume
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-purple-300 text-center p-3 text-sm text-purple-900">
        © {new Date().getFullYear()} Smart Resume Builder by Tanushree Ray
      </footer>
    </div>
  );
}

export default CustomizeSections;
