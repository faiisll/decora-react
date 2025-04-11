import React from 'react';

const DialogInviteUser = ({id = "dialog-invite", ref}) => {
    return (
        <dialog id={id} className="modal">
        <div className="modal-box">
            <div className='flex flex-col'>
                <h2 className='text-center font-semibold text-lg'>Invite User</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter user email"
                    />
                </div>
                <div className="mb-4 flex w-full gap-4">
                    <div className='w-full sm:w-1/2'>
                        <label  className="block text-sm font-medium mb-2">Role</label>
                        <select defaultValue="Select user role" className="select">
                            <option disabled={true}>Pick a role</option>
                            <option value={'admin'}>Admin</option>
                            <option value={'worker'}>Worker</option>
                            <option value={'client'}>Client</option>
                        </select>
                    </div>
                    <div className='w-full sm:w-1/2'>
                        <label  className="block text-sm font-medium mb-2">Job title</label>
                        <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Designer/Contractor/etc..."/>
                    </div>
                </div>
            </div>
            <div className="modal-action flex">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-ghost">Close</button>
                </form>
                <button className='btn btn-neutral'>Invite</button>
            </div>
        </div>
        </dialog>
    );
}

export default DialogInviteUser;
