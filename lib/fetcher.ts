import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data).catch(e => e)

export default fetcher