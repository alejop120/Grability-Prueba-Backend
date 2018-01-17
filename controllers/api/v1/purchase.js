'use strict'

function index(req, res){
  var response = {success: false, status: 400, message: "Incomplete Fields"}
  console.log(req.body);

  var shopping_centers = req.body.shopping_centers;
  var roads = req.body.roads;
  var fish_types = req.body.fish_types;
  var edge = req.body.edge;
  
  if (shopping_centers && roads && fish_types && edge) {
    var vertex = new Array(shopping_centers)
    for (var i = 1; i <= roads; i++) {
      vertex[i-1] = ({"N": i, "K": 1 << i})
    }
    var graph = { vertex: vertex, edge: edge}
    response.success = true;
    response.status = 200;
    response.message = "Success";
    response.time = dijkstra("1", graph);
  }
  res.status(response.status).send(response);
}

function dijkstra(initial, graph) {
  var distance = {},
    prev = {},
    vertices = {},
    u,
    finalTime;

  graph.vertex.forEach(function(v_i) {
    distance[v_i.N] = Infinity;
    prev[v_i.N] = null;
    vertices[v_i.N] = true;
  });

  distance[initial] = 0;

  while (Object.keys(vertices).length > 0) {
    u = Object.keys(vertices).reduce(function(prev, v_i) {
      return distance[prev] > distance[v_i] ? + v_i : prev;
    }, Object.keys(vertices)[0]);

    graph.edge.filter(function(edge) {
      var from = edge[0],
        to   = edge[1];
      return from===u || to===u;
    })
    .forEach(function(edge) {
      var to = edge[1]===u ? edge[0] : edge[1],
        dist = distance[u] + edge[2];

      finalTime = dist;

      if (distance[to] > dist) {
        distance[to] = dist;
        prev[to] = u;
      }
    });
    delete vertices[u];
  }
  return finalTime;
};

module.exports = { index }