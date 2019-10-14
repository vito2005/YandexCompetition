const findRoute = function (start, end, fetchFlights) {
  let fetchPromise, route
  const routes = [[start]]
  const last = arr => arr[arr.length - 1]
  const responseExecution = response => {
    if (response.includes(end)) {
      route = [...routes.map(list => last(list)), end]
    } else if (response.length) {
      routes.push(response)
    } else {
      while (routes.length && last(routes).length === 1) {
        routes.pop()
      }
      if (!routes.length) {
        route = 'no way'
      } else {
        last(routes).pop()
      }
    }
    if (!route) {
      fetchPromise = fetchPromise.then(responseExecution)
      return fetchFlights(last(last(routes)))
    }
  }
  fetchPromise = fetchFlights(start).then(responseExecution)
  return new Promise((resolve, reject) => {
    const id = setInterval(() => {
      if (route) {
        clearInterval(id)
        resolve('Составной авиабилет найден: [ ' + route.join(', ') + ' ]')
      }
    }, 1000)
  })
}

const fetchFlights = city => {
  const flights = [
    ['A', 'B'],
    ['A', 'D'],
    ['A', 'C'],
    ['D', 'K'],
    ['D', 'M'],
    ['D', 'L'],
    ['M', 'Q'],
    ['M', 'Z'],
    ['L', 'G'],
    ['L', 'F'],
    ['F', 'Y'],
    ['G', 'Z']
  ]

  return Promise.resolve(flights.filter(item => item[0] === city).map(item => item[1]))
}
