const globeContainer = document.getElementById("globeViz");

const globe = Globe()(globeContainer)
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
  .backgroundColor("rgba(0,0,0,0)");

globe.width(615);
globe.height(615);
globe.pointOfView({ altitude: 1.6 });

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.7;