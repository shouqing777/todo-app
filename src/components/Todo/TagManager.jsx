import React, { useState } from "react";

const TagManager = ({ tags, onAddTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState("");
  const [tagColor, setTagColor] = useState("#1890ff");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag({ name: newTag.trim(), color: tagColor });
      setNewTag("");
      setTagColor("#1890ff");
    }
  };

  return (
    <div className="tag-manager">
      <h3>標籤管理</h3>
      <form onSubmit={handleSubmit} className="tag-manager__form">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="新增標籤..."
        />
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
        />
        <button type="submit">新增標籤</button>
      </form>
      <div className="tag-manager__list">
        {tags.map((tag) => (
          <div key={tag.name} className="tag-item">
            <span
              className="tag-color"
              style={{ backgroundColor: tag.color }}
            />
            <span className="tag-name">{tag.name}</span>
            <button
              onClick={() => onDeleteTag(tag.name)}
              className="tag-delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagManager;
