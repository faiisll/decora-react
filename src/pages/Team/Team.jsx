import React, { useEffect, useState } from 'react'
import TableTeams from '../../components/Table/TableTeams'
import { TbUserPlus } from "react-icons/tb";
import DialogInviteUser from '../../components/Dialog/DialogInviteUser';
import { useGetTeamsQuery, useGetTeamsInvitationsQuery } from '../../store/apis/teamApi';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';

export default function Team() {
  const {data:dataTeam, isLoading:loadingTeam, isError:errorTeam, refetch} = useGetTeamsQuery()
  const {data:dataInvite, isLoading:loadingInvite, isError:errorInvite, refetch:refetchInvite} = useGetTeamsInvitationsQuery()
  const [tab, setTab] = useState("active")
  const [openInvite, setOpenInvite] = useState(false)
  let usersOnline = useSelector((state) => state.team.usersOnline)
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const navigate = useNavigate()

  useEffect(() => {
    refetch()
    refetchInvite()

    if(stateParam === "invite"){
      
      setTimeout(() => {
        navigate('', {replace: true})
        setOpenInvite(true)
      }, 200)
    }
  }, [])
  return (
    <div className='w-full flex flex-col h-full gap-2'>
      <DialogInviteUser open={openInvite} onChange={setOpenInvite} />
      <div className='flex justify-between mb-4'>
        <div className='flex flex-col'>
          <h1 className='font-medium text-lg'>Adjust Team Member</h1>
          <h2 className='text-sm text-gray-400'>Quickly manage people and roles to keep your team details accurate and relevant.</h2>
        </div>
        <button className='btn btn-neutral' onClick={()=>{ setOpenInvite(true)}}>
          Invite
          <TbUserPlus />
        </button>
      </div>

      <div className="tabs tabs-box w-fit">
        <input 
        type="radio" 
        checked={tab === 'active'} 
        onChange={(e) => (setTab(e.target.value))}  
        name="team_tab" 
        value="active" 
        className="tab" 
        aria-label="Active"/>
        <input 
        type="radio" 
        checked={tab === 'pending'} 
        onChange={(e) => (setTab(e.target.value))} 
        name="team_tab" 
        value="pending" 
        className="tab" 
        aria-label="Pending"  />
      </div>

        {tab === "active" ? <TableTeams usersOnline={usersOnline} data={dataTeam && dataTeam.data} loading={loadingTeam} /> :
        <TableTeams data={dataInvite && dataInvite.data} />}
    </div>
  )
}
