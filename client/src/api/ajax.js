import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  if (type === 'GET') {
    //{username:tom, password: 123}
    //username=tom&password=123
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length-1)
      url = url+'?'+paramStr
    }
    return axios.get(url)
  } else {
    return axios.post(url, data)
  }
}
