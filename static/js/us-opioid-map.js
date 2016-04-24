var overdoses = L.geoJson(countiesData, {
  style: overdosesStyle,
  onEachFeature: onEachFeature
});

  var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
  });

  var map = L.map('map', {
      center: [37.8, -96],
      zoom: 4,
      layers: [baseLayer, overdoses]
  });

  /* Useful if we want to extand layers
  var baseMaps = {
      "United States Counties": baseLayer
  };

  var overlayMaps = {
      "Overdoses": overdoses
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
  */

  // control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = '<h4>Opioid OD count for year 2014</h4>' + (props ?
      '<b>' + props.NAME + '</b><br />'
      + props.od_count + ' opioid OD<br />'
      + props.opioid_claim_count + ' opioid claim<br />'
      + props.od_per_prescription + ' OD per prescription<br />'
      : 'Hover over a county');
  };

  info.addTo(map);


  // get color depending on population density value
  function getColor(d) {
    return d > 500 ? '#800026' :
           d > 250  ? '#BD0026' :
           d > 100  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
           d > 25   ? '#FD8D3C' :
           d > 10   ? '#FEB24C' :
           d > 5   ? '#FED976' :
                      '#FFEDA0';
  }

  function overdosesStyle(feature) {
    return {
      weight: 0,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5,
      fillColor: getColor(feature.properties.od_count)
    };
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    overdoses.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');
  map.attributionControl.addAttribution('OD data &copy; <a href="http://wonder.cdc.gov/">CDC Wonder</a>');
  map.attributionControl.addAttribution('Prescription data &copy; <a href="http://wonder.cdc.gov/">CDC Wonder</a>');


  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 5, 10, 25, 50, 100, 250, 500],
      labels = [],
      from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(map);
