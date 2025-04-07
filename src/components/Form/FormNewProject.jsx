import React, { useState } from 'react';
import MultiSelectUser from '../Select/MultiSelectUser';

const FormNewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLead, setProjectLead] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectTemplate, setProjectTemplate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectName,
      projectDescription,
      projectLead,
      teamMembers,
      startDate,
      endDate,
      projectTemplate,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium mb-2">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter project name"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block text-sm font-medium mb-2">Project Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter project description"
            rows="4"
            required
          />
        </div>

        {/* Project Lead */}
        <div className="mb-4">
          <label htmlFor="projectLead" className="block text-sm font-medium mb-2">Project Lead</label>
          <select
            id="projectLead"
            value={projectLead}
            onChange={(e) => setProjectLead(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a project lead</option>
            <option value="lead1">Lead 1</option>
            <option value="lead2">Lead 2</option>
            <option value="lead3">Lead 3</option>
          </select>
        </div>

        {/* Team Members */}
        <div className="mb-4">
          <label htmlFor="teamMembers" className="block text-sm font-medium mb-2">Team Members</label>
          <MultiSelectUser />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Project Template */}
        <div className="mb-4">
          <label htmlFor="projectTemplate" className="block text-sm font-medium mb-2">Project Template</label>
          <select
            id="projectTemplate"
            value={projectTemplate}
            onChange={(e) => setProjectTemplate(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a project template</option>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            <option value="template3">Template 3</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default FormNewProject;
