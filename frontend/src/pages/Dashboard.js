import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Dashboard.css'
import '../css/navbar.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [campaigns, setCampaigns] = useState([])
  const [filter, setFilter] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    impressions: '',
    clicks: '',
    conversions: ''
  })

  const navigate = useNavigate()

  const fetchCampaigns = async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/campaigns', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCampaigns(res.data)
  }

  const addCampaign = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/campaigns', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      resetForm()
      fetchCampaigns()
    } catch (err) {
      console.log('Failed to add campaign')
    }
  }

  const updateCampaign = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:5000/api/campaigns/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      resetForm()
      fetchCampaigns()
    } catch (err) {
      console.error('Failed to update campaign', err)
    }
  }

  const deleteCampaign = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchCampaigns()
    } catch (err) {
      console.error('Failed to delete campaign', err)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      impressions: '',
      clicks: '',
      conversions: ''
    })
    setEditingId(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-title">Campaign Manager</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-header">
        <h3>Search by name</h3>
        <input
          type="text"
          value={filter}
          placeholder="Filter by name..."
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <div className="form">
        <h3>{editingId ? 'Update Campaign' : 'Add Campaign'}</h3>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Impressions"
          value={formData.impressions}
          onChange={e => setFormData({ ...formData, impressions: e.target.value })}
        />
        <input
          type="number"
          placeholder="Clicks"
          value={formData.clicks}
          onChange={e => setFormData({ ...formData, clicks: e.target.value })}
        />
        <input
          type="number"
          placeholder="Conversions"
          value={formData.conversions}
          onChange={e => setFormData({ ...formData, conversions: e.target.value })}
        />
        <button onClick={() => editingId ? updateCampaign() : addCampaign()}>
          {editingId ? 'Update Campaign' : 'Add Campaign'}
        </button>
        {editingId && (
          <button onClick={resetForm} style={{ marginTop: '10px', backgroundColor: '#555' }}>
            Cancel
          </button>
        )}
      </div>

      <div className="table-container">
        <h3>All Campaigns</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.date}</td>
                <td>{c.impressions}</td>
                <td>{c.clicks}</td>
                <td>{c.conversions}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => {
                      const formatDate = iso => new Date(iso).toISOString().split('T')[0]
                      setFormData({
                        name: c.name,
                        date: formatDate(c.date),
                        impressions: c.impressions,
                        clicks: c.clicks,
                        conversions: c.conversions
                      })

                      setEditingId(c.id)
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCampaign(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
