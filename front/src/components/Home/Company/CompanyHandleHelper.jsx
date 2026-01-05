import api from '../../../api';
import { toast } from 'react-toastify';

export const fetchCompanyDetails = async (companyId, setGeneralInfo, setLoading, setError) => {
  try {
    const response = await api.get(`/company/get/company/${companyId}`);
    setGeneralInfo(response.data);
    console.log('Company details:', response.data);
    setLoading(false);
    // Handle the fetched data as needed
  } catch (error) {
    setError('Error fetching company details.');
    toast.error('Error fetching company details.');
    console.error('Error fetching company details:', error);
  }
};

export const fetchPositions = async (companyId, setAllPositions) => {
  try {
    const response = await api.get(`/position/get_all_positions/${companyId}`);
    setAllPositions(response.data);
  } catch (error) {
    console.error('Error fetching positions:', error);
  }
};

 export const handleRemove = async (positionId,setAllPositions,allPositions) => {
    if (!positionId) return;

    try {
      console.log('Removing position with ID:', positionId);
      await api.delete(`/position/remove/position`, { params: { position_id: positionId } });
      setAllPositions(allPositions.filter((pos) => pos.id !== positionId));
      toast.success('Position removed successfully.');
    } catch (error) {
      toast.error('Error removing position.');
      console.error('Error removing position:', error);
    }
  };
  export const handleRecruiters = async (positionId,setRecruiterShow,setPositionIdForRecruiters,setAllRecruiters) => {
    if (!positionId) return;
    try {
      setRecruiterShow(true);
      setPositionIdForRecruiters(positionId);
      const res = await api.get(`/recruiter/all_position_reqruiters_pid/${positionId}`);
      setAllRecruiters(res.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    }
  };

export const handleTitle = async (
  companyId,
  positionId,
  Title,
  setEditTitle,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    console.log('Updating title for position ID:', positionId);
    console.log('New title:', Title);
    console.log('Company ID:', companyId);
    const payload = { company_id: companyId, position_id: positionId, title: Title };
    await api.put(`/position/update/title`, payload);
    toast.success('Title updated successfully.');
    setEditTitle(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating title.');
    console.error('Error updating title:', error);
  }
};
export const handlePositionNumber = async (
  companyId,
  positionId,
  Number,
  setEditNumber,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = { company_id: companyId, position_id: positionId, job_number: Number };
    console.log('Updating position number with payload:', payload);
    await api.put(`/position/update/job_number`, payload);
    toast.success('Position number updated successfully.');
    setEditNumber(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating position number.');
    console.error('Error updating position number:', error);
  }
};
// Position Experience Level
export const handleExperienceLevel = async (
  companyId,
  positionId,
  ExperienceLevel,
  setEditExperienceLevel,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = {
      company_id: companyId,
      position_id: positionId,
      experience_level: ExperienceLevel,
    };
    await api.put(`/position/update/experience_level`, payload);
    toast.success('Experience level updated successfully.');
    setEditExperienceLevel(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating experience level.');
    console.error('Error updating experience level:', error);
  }
};
// Position Remote Type
export const handleRemoteType = async (
  companyId,
  positionId,
  RemoteType,
  setEditRemoteType,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = { company_id: companyId, position_id: positionId, remote_type: RemoteType };
    console.log('Updating remote type with payload:', payload);
    await api.put(`/position/update/remote_type`, payload);
    toast.success('Remote type updated successfully.');
    setEditRemoteType(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating remote type.');
    console.error('Error updating remote type:', error);
  }
};
// Position Date Posted
export const handleDatePosted = async (
  companyId,
  positionId,
  DatePosted,
  setEditDatePosted,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = { company_id: companyId, position_id: positionId, date_posted: DatePosted };
    await api.put(`/position/update/date_posted`, payload);
    toast.success('Date posted updated successfully.');
    setEditDatePosted(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating date posted.');
    console.error('Error updating date posted:', error);
  }
};
// Position Department
export const handleDepartment = async (
  companyId,
  positionId,
  Department,
  setEditDepartment,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = { company_id: companyId, position_id: positionId, department: Department };
    await api.put(`/position/update/department`, payload);
    toast.success('Department updated successfully.');
    setEditDepartment(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating department.');
    console.error('Error updating department:', error);
  }
};
// Position Compensation
export const handleCompensation = async (
  companyId,
  positionId,
  Compensation,
  setEditCompensation,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = {
      company_id: companyId,
      position_id: positionId,
      compensation: Compensation,
    };
    const res = await api.put(`/position/update/compensation`, payload);
    toast.success(`Compensation updated successfully.${res.data.detail}`);
    setEditCompensation(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating compensation.');
    console.error('Error updating compensation:', error);
  }
};
// Position Accomodation
export const handleAccommodation = async (
  companyId,
  positionId,
  Accommodation,
  setEditAccommodation,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = {
      company_id: companyId,
      position_id: positionId,
      accommodation: Accommodation,
    };
    console.log('Updating accommodation with payload:', payload);
    await api.put(`/position/update/accommodation`, payload);
    toast.success('Accommodation updated successfully.');
    setEditAccommodation(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating accommodation.');
    console.error('Error updating accommodation:', error);
  }
};
// Position Status
export const handleStatus = async (
  companyId,
  positionId,
  Status,
  setEditStatus,
  setUpdated,
  updated
) => {
  if (!positionId) return;
  try {
    const payload = { company_id: companyId, position_id: positionId, status: Status };
    console.log('Updating status with payload:', payload);
    await api.put(`/position/update/status`, payload);
    toast.success('Status updated successfully.');
    setEditStatus(false);
    setUpdated(!updated);
  } catch (error) {
    toast.error('Error updating status.');
    console.error('Error updating status:', error);
  }
};

export const handleEditRecruiterFirstName = async (
  recruiterId,
  recruiterFirstNameEdit,
  setRecruiterFirstNameEdit,
  setUpdated,
  updated,
  setRecruiterEditNameShow
) => {
  if (!recruiterId) return;
  const nameCheck = recruiterFirstNameEdit.trim()
  if(!nameCheck) {
    toast.error('First name cannot be empty.');
    return;
  }else if(nameCheck.length < 2) {
    toast.error('First name must be at least 2 characters long.');
    return;
  } else if(nameCheck.length > 50) {
    toast.error('First name cannot exceed 50 characters.');
    return;
  }
  try {
    console.log('Editing recruiter phone for recruiter ID:', recruiterId);
    setRecruiterEditNameShow(true);
    const payload = { recruiter_id: recruiterId, first_name: recruiterFirstNameEdit };
    console.log('payload', payload);
    console.log('Payload for editing recruiter first name:', payload);
    await api.put(`/recruiter/change/first_name`, payload);
    toast.success('Recruiter first name edited successfully.');
    setRecruiterFirstNameEdit('');
    setUpdated(!updated);
    setRecruiterEditNameShow(false);
  } catch (error) {
    toast.error('Error editing recruiter first name.');
    console.error('Error editing recruiter first name:', error);
  }
};

export const handleEditRecruiterLastName = async (
  recruiterId,
  recruiterLastNameEdit,
  setRecruiterLastNameEdit,
  setUpdated,
  updated,
  setRecruiterEditNameShow
) => {
  if (!recruiterId) return;
  try {
    console.log('Editing recruiter phone for recruiter ID:', recruiterId);
    setRecruiterEditNameShow(true);
    const payload = { recruiter_id: recruiterId, last_name: recruiterLastNameEdit };
    console.log('payload', payload);
    console.log('Payload for editing recruiter last name:', payload);
    await api.put(`/recruiter/change/last_name`, payload);
    toast.success('Recruiter last name edited successfully.');
    setRecruiterLastNameEdit('');
    setUpdated(!updated);
    setRecruiterEditNameShow(false);
  } catch (error) {
    toast.error('Error editing recruiter last name.');
    console.error('Error editing recruiter last name:', error);
  }
};
export const handleEditRecruiterEmail = async (
  recruiterId,
  recruiterEmailEdit,
  setRecruiterEmailEdit,
  setUpdated,
  updated,
  setRecruiterEditEmailShow
) => {
  if (!recruiterId) return;
  try {
    console.log('Editing recruiter email for recruiter ID:', recruiterId);
    setRecruiterEditEmailShow(true);
    const payload = { recruiter_id: recruiterId, email: recruiterEmailEdit };
    console.log('payload', payload);
    console.log('Payload for editing recruiter email:', payload);
    await api.put(`/recruiter/change/email`, payload);
    toast.success('Recruiter email edited successfully.');
    setRecruiterEmailEdit('');
    setUpdated(!updated);
    setRecruiterEditEmailShow(false);
  } catch (error) {
    toast.error('Error editing recruiter email.');
    console.error('Error editing recruiter email:', error);
  }
};
export const handleEditRecruiterPhone = async (
  recruiterId,
  recruiterPhoneEdit,
  setRecruiterPhoneEdit,
  setUpdated,
  updated,
  setRecruiterEditPhoneShow
) => {
  if (!recruiterId) return;
  try {
    console.log('Editing recruiter phone for recruiter ID:', recruiterId);
    setRecruiterEditPhoneShow(true);
    const payload = { recruiter_id: recruiterId, phone_number: '+1' + recruiterPhoneEdit };
    console.log('payload', payload);
    console.log('Payload for editing recruiter phone number:', payload);
    await api.put(`/recruiter/change/phone_number`, payload);
    toast.success('Recruiter phone edited successfully.');
    setRecruiterPhoneEdit('');
    setUpdated(!updated);
    setRecruiterEditPhoneShow(false);
  } catch (error) {
    toast.error('Error editing recruiter phone.');
    console.error('Error editing recruiter phone:', error);
  }
};

export const normalizePhoneNumber = (phoneNumber) => {
  const raw = String(phoneNumber);
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  console.log('Digits extracted:', digits);
  // Format as (123) 456-7890
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    return raw;
  }
};
