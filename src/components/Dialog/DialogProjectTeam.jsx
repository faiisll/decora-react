import React, { useEffect, useMemo, useState } from 'react'
import DialogModal from './Dialog'
import CardMember from '../Card/CardMember'
import { TbTrashX, TbX } from "react-icons/tb";
import CardAddMember from '../Card/CardAddMember';
import { TbUserPlus } from "react-icons/tb";
import { useNavigate } from 'react-router';
import { useGetTeamsQuery } from '../../store/apis/teamApi';
import { useUpdateProjectTeamMutation } from '../../store/apis/projectApi';
import createToast from '../toast/Toast';


const InviteTeam =  () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {navigate('/teams?state=invite')}} className='flex justify-between items-center cursor-pointer bg-gray-50 py-4 px-4 rounded-lg group/member transition-all hover:bg-gray-200'>
        <div className='flex gap-4 items-center'>
            <div className='aspect-square w-10 h-10 rounded-lg border border-dashed border-gray-400 items-center flex justify-center'>
                <TbUserPlus />

            </div>
            <h4 className='text-sm'>Invite User</h4>
        </div>
    </div>
  )
}
const DialogProjectTeam = ({open = false, onChange = () => {}, teams = [], projectId})  =>{
  
  const {data:teamsOrg, isLoading:loadingTeamOrg, refetch} = useGetTeamsQuery(100)
  const [user, setUser] = useState("")
  const [updateTeam, {isLoading}] = useUpdateProjectTeamMutation()
  const filteredInvite = useMemo(() => {

    if(!teams || !teamsOrg || loadingTeamOrg) return []

    return teamsOrg.data.filter(user => {
      const currentTeams = teams.map(cur => cur.email)

      return !currentTeams.includes(user.email)
    })

  }, [teamsOrg, teams])

  const invite = () => {
    const currentTeams = teams.map(team => team.email)
    const bodyTeam = teams.length ? currentTeams+","+user : user
    if(!user) return
    updateTeam({id:projectId, teams: bodyTeam}).unwrap().then(res => {
      createToast({
        message: user + "has added to team project.",
        type: "success"
      })

      setUser("")

    }).catch((err) => {
      createToast({
        message: err.data.message,
        type: "error"
      })
    })

  }

  const deleteUser = (email) => {
    const currentTeams = teams.filter(team => team.email !== email).map(team => team.email)
    const bodyTeam = currentTeams.join(",")

    updateTeam({id:projectId, teams: bodyTeam}).unwrap().then(res => {
      createToast({
        message: email + "has deleted to team project.",
        type: "success"
      })

      setUser("")

    }).catch((err) => {
      createToast({
        message: err.data.message,
        type: "error"
      })
    })


  }

  useEffect(() => {
    if(open){
      refetch()
    }
  }, [open])
  return (
    <DialogModal open={open} onToggle={onChange} size='w-lg overflow-y-hidden'>
        <div className='w-full flex flex-col gap-4 overflow-y-auto max-h-full gap'>
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold'>Project Teams</h4>
              <button className='btn btn-ghost btn-sm' onClick={() => {onChange(false)}}>
                <TbX className='text-lg'/>
              </button>
            </div>
            <div className='flex items-center gap-4 pl-2'>
              <select disabled={isLoading} className='select' value={user} onChange={(e) => {setUser(e.target.value)}}>
                <option value={""} disabled>Select user to project</option>
                {teamsOrg && filteredInvite.map(team => <option key={team.id} value={team.email}>{team.name} - {team.role}</option>)}
              </select>
              <CardAddMember onClick={invite} />
            </div>
            <div className='flex flex-col gap-2 max-h-72 overflow-auto'>
              <InviteTeam />
                {teams.map((member, index) => (
                    <CardMember key={index} member={member}>
                      {teams.length > 1 && <button className='btn btn-soft btn-error btn-circle' onClick={() => {deleteUser(member.email)}}>
                        <TbTrashX className='text-xl' />
                      </button>}
                    </CardMember>
                ))}
            </div>
        </div>
    </DialogModal>
  )
}

export default DialogProjectTeam