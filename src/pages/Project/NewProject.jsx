import React from 'react';
import AnimatePageFade from '../../components/Animate/AnimatePageFade';
import FormNewProject from '../../components/Form/FormNewProject';

const NewProject = () => {
    return (
        <AnimatePageFade className="w-full">
            <FormNewProject />
        </AnimatePageFade>
    );
}

export default NewProject;
