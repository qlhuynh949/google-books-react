import axios from 'axios'

const Item = {
  read: () => axios.get('/api/items'),
  create: item => axios.post('/api/items', item),
  update: (id, updates) => axios.put(`/api/items/${id}`, updates),
  delete: id => axios.delete(`/api/items/${id}`)
}

export default Item