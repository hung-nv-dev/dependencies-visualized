import { Component, OnInit } from '@angular/core';

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {
  ForceDirectedSeries,
  ForceDirectedTree,
} from '@amcharts/amcharts4/plugins/forceDirected'; // Named import

import * as dataChart from "./data.json";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {

    am4core.useTheme(am4themes_animated);

    let chart = am4core.create('chartdiv', ForceDirectedTree);

    let networkSeries = chart.series.push(new ForceDirectedSeries()); // Corrected

    networkSeries.dataFields.linkWith = 'linkWith';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.id = 'name';
    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.children = 'children';

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 8;
    networkSeries.linkWithStrength = 0;

    let nodeTemplate = networkSeries.nodes.template;
    nodeTemplate.tooltipText = '{name}';
    nodeTemplate.fillOpacity = 1;
    nodeTemplate.label.hideOversized = true;
    nodeTemplate.label.truncate = true;

    let linkTemplate = networkSeries.links.template;
    linkTemplate.strokeWidth = 1;
    let linkHoverState = linkTemplate.states.create('hover');
    linkHoverState.properties.strokeOpacity = 1;
    linkHoverState.properties.strokeWidth = 2;

    nodeTemplate.events.on('over', function (event) {
      let dataItem = event.target.dataItem;
      dataItem.childLinks.each(function (link) {
        link.isHover = true;
      });
    });

    nodeTemplate.events.on('out', function (event) {
      let dataItem = event.target.dataItem;
      dataItem.childLinks.each(function (link) {
        link.isHover = false;
      });
    });

    networkSeries.data = (dataChart as any).default;

    // amCharts;
  }
}
