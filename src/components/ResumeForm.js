import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function ResumeForm({ formData, setFormData, profileImage, setProfileImage }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleRemoveItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleDragEnd = (section) => (result) => {
    if (!result.destination) return;
    const items = Array.from(formData[section]);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setFormData({ ...formData, [section]: items });
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-purple-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Profile</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2 rounded bg-white"
          />
          {profileImage && (
            <img src={profileImage} alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full border" />
          )}
        </div>

        {['name', 'email', 'phone', 'summary', 'linkedin', 'github'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm text-gray-700 mb-1 capitalize">
              {field === 'linkedin' ? 'LinkedIn URL' : field === 'github' ? 'GitHub URL' : field}
            </label>
            {field === 'summary' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 p-2 rounded"
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Repeatable Sections */}
      {[
        { key: 'education', label: 'Education', fields: ['school', 'degree', 'startYear', 'endYear'] },
        { key: 'skills', label: 'Skills' },
        { key: 'projects', label: 'Projects', fields: ['title', 'description'] },
        { key: 'certificates', label: 'Certificates', fields: ['name', 'issuer', 'year', 'description'] },
        { key: 'languages', label: 'Languages' },
      ].map(({ key, label, fields }) => (
        <div key={key} className="bg-purple-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">{label}</h3>

          <DragDropContext onDragEnd={handleDragEnd(key)}>
            <Droppable droppableId={key}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {formData[key].map((item, index) => (
                    <Draggable key={index} draggableId={`${key}-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="relative mb-4 bg-white p-3 rounded border"
                        >
                          <div {...provided.dragHandleProps} className="absolute left-0 top-1/2 -translate-y-1/2 pl-2 cursor-grab">
                            <span className="text-gray-400">⋮⋮</span>
                          </div>

                          <div className="pl-6 space-y-2">
                            {Array.isArray(item)
                              ? null
                              : fields
                                ? fields.map((field) => (
                                  <input
                                    key={field}
                                    type="text"
                                    placeholder={field}
                                    value={item[field]}
                                    onChange={(e) =>
                                      handleArrayChange(key, index, field, e.target.value)
                                    }
                                    className="w-full border border-gray-300 p-2 rounded"
                                  />
                                ))
                                : (
                                  <input
                                    type="text"
                                    placeholder={`${label} #${index + 1}`}
                                    value={item}
                                    onChange={(e) => {
                                      const updated = [...formData[key]];
                                      updated[index] = e.target.value;
                                      setFormData({ ...formData, [key]: updated });
                                    }}
                                    className="w-full border border-gray-300 p-2 rounded"
                                  />
                                )}

                            {/* Remove Button */}
                            {formData[key].length > 1 && (
                              <button
                                onClick={() => handleRemoveItem(key, index)}
                                className="text-xs text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Add Button */}
          <button
            onClick={() =>
              setFormData({
                ...formData,
                [key]: [
                  ...formData[key],
                  fields
                    ? Object.fromEntries(fields.map((f) => [f, '']))
                    : '',
                ],
              })
            }
            className="text-sm text-purple-700 hover:underline"
          >
            + Add {label}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ResumeForm;
