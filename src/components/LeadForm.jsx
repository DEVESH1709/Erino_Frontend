import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLead, updateLead, fetchLeadById} from '../features/leadsSlice';
import { useNavigate, useParams } from 'react-router-dom';

function LeadForm(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentLead = useSelector(state => state.leads.currentLead);
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        company:'',
        city:'',
        state:'',
        source:'website',
        status:'new',
        score:0,
        leadValue:0,
        last_activity_at:'',
        isqualified :false

});

useEffect(()=>{
    if(id){
        dispatch(fetchLeadById(id));
    }
},[id,dispatch]);

useEffect(()=>{
    if(currentLead){
        setFormData({
            ...currentLead,
            last_activity_at: currentLead.last_activity_at ? currentLead.last_activity_at.split('T')[0] : ''
        });
    }
},[currentLead,id]);

 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.last_activity_at) delete payload.last_activity_at;
    try {
      if (id) {
        await dispatch(updateLead({ id, leadData: payload })).unwrap();
      } else {
        await dispatch(createLead(payload)).unwrap();
      }
      navigate('/leads');
    } catch (error) {
      alert('Error saving lead');
    }
  };



 return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-4">{id ? 'Edit Lead' : 'New Lead'}</h2>
      <form onSubmit={handleSubmit}>
        {['first_name','last_name','email','phone','company','city','state'].map(field => (
          <div className="mb-3" key={field}>
            <label className="block text-gray-700">{field.replace('_', ' ').toUpperCase()}</label>
            <input
              name={field}
              type="text"
              value={formData[field] || ''}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required={(field==='first_name' || field==='last_name' || field==='email')}
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="block text-gray-700">Source</label>
          <select name="source" value={formData.source} onChange={handleChange} className="border rounded w-full py-2 px-3">
            <option value="website">Website</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="referral">Referral</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="border rounded w-full py-2 px-3">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Score</label>
          <input
            name="score"
            type="number"
            value={formData.score}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            min="0"
            max="100"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Lead Value</label>
          <input
            name="lead_value"
            type="number"
            value={formData.lead_value}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Last Activity Date</label>
          <input
            name="last_activity_at"
            type="date"
            value={formData.last_activity_at}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-3 flex items-center">
          <input
            name="is_qualified"
            type="checkbox"
            checked={formData.is_qualified}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Qualified</label>
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
          {id ? 'Update Lead' : 'Create Lead'}
        </button>
      </form>
    </div>
  );
}

export default LeadForm;
