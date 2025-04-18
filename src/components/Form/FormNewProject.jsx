import React, { useState } from 'react';
import MultiSelectUser from '../Select/MultiSelectUser';
import SelectTemplateProject from '../Select/SelectTemplateProject';
import Calendar from '../Calendar/Calendar';
import DatePicker from '../Calendar/DatePicker';
import { Formik, Form } from 'formik';
import * as Yup from "yup"
import Input from '../inputs/Input';
import clsx from 'clsx';

const FormNewProject = () => {
  const initialValues = {
    name: "",
    description: "",
    lead: "",
    teams: [],
    timeline: [null, null],
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(5).required(),
    description: Yup.string().min(5),
    lead: Yup.string().required(),
    teams: Yup.array().required(),
    timeline: Yup.array().test("not nuull", "Timeline project is required.", (val) => {
      return val.every(v => Boolean(v))
    })
  })

  const handleSubmit = (values, actions) => {
    console.log(values)

  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md bg-gray-50 shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>

        {({setFieldValue, values, touched, errors}) => (
          <Form>
              <div className="mb-4">
                <label htmlFor="projectName" className="block text-sm font-medium mb-2">Project Name</label>
                <Input
                type="text"
                name='name'
                placeholder="Enter project name"/>
              </div>

              {/* Project Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                placeholder="Enter project description"
                name="description"
                />
              </div>

              {/* Project Lead */}
              <div className="mb-4">
                <label htmlFor="projectLead" className="block text-sm font-medium mb-2">Project Lead</label>
                <select
                value={values.lead}
                onChange={(e) => {setFieldValue("lead" ,e.target.value)}}
                id="projectLead"
                className={clsx("select select-bordered w-full" , touched["lead"] && errors["lead"] ? 'select-error' : '')}>
                  <option value="" disabled>Select a project lead</option>
                  <option value="lead1">Lead 1</option>
                  <option value="lead2">Lead 2</option>
                  <option value="lead3">Lead 3</option>
                </select>
                {touched["lead"] && errors["lead"] ? (<p className="validator-hint text-red-500 mt-1">{errors["lead"]}</p>) : null}
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <label htmlFor="teamMembers" className="block text-sm font-medium mb-2">Team Members</label>
                <MultiSelectUser value={values.teams} onChange={(e) => {setFieldValue("teams", e)}}  />
              </div>

              {/* Start Date */}

              <div className='flex flex-col mb-4'>
                <label htmlFor="startDate" className="block text-sm font-medium mb-2">Timeline</label>
                <DatePicker multiple value={values.timeline} onChange={(e) => {setFieldValue('timeline', e)}} />
                {touched["timeline"] && errors["timeline"] ? (<p className="validator-hint text-red-500 mt-1">{errors["timeline"]}</p>) : null}
              </div>
              
              <div className='mb-4'>
                <label htmlFor="projectTemplate" className="block text-sm font-medium mb-2">Project Template</label>
                <SelectTemplateProject />
              </div>
              

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button type="reset" className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-neutral">Save</button>
              </div>
            {/* Project Name */}

          </Form>

        )}

      </Formik>
    </div>
  );
};

export default FormNewProject;
