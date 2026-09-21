import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxChartModule, DxDataGridModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';
import { Gridster, GridsterItem, CompactType, DisplayGrid, GridType } from 'angular-gridster2';
import { of, interval } from 'rxjs';

interface DashboardItem {
  cols: number;
  rows: number;
  y: number;
  x: number;
  type: 'chart' | 'table' | 'info';
  id: string;
  title: string;
  data?: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Gridster,
    GridsterItem,
    DxChartModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  options = {
    gridType: GridType.Fit,
    compactType: CompactType.None,
    margin: 10,
    outerMargin: true,
    draggable: { enabled: true },
    resizable: { enabled: true },
    displayGrid: DisplayGrid.OnDragAndResize,
    minCols: 12,
    minRows: 6,
    maxCols: 12,
    maxRows: 100,
    pushItems: true
  };

  dashboardItems: DashboardItem[] = [
    {
      cols: 6,
      rows: 4,
      y: 0,
      x: 0,
      type: 'chart',
      id: 'chart1',
      title: 'Performance Chart',
      data: [
        { time: '10:00', value: 20 },
        { time: '11:00', value: 35 },
        { time: '12:00', value: 40 }
      ]
    },
    {
      cols: 3,
      rows: 2,
      y: 0,
      x: 6,
      type: 'table',
      id: 'table1',
      title: 'Sensor Data',
      data: [
        { name: 'Temperature', value: '23°C', status: 'normal' },
        { name: 'Humidity', value: '50%', status: 'normal' },
        { name: 'Pressure', value: '1013 hPa', status: 'good' },
        { name: 'Battery', value: '87%', status: 'good' }
      ]
    },
    {
      cols: 3,
      rows: 2,
      y: 2,
      x: 6,
      type: 'info',
      id: 'info1',
      title: 'System Status',
      data: 'All systems operational. Last updated: Just now'
    }
  ];

  selectedRange = 'Last 1h';
  timeRanges = ['Last 1h', 'Last 6h', 'Last 24h'];

  ngOnInit() {
    // Simulate live chart data updates every 3s
    interval(3000).subscribe(() => {
      const chart = this.dashboardItems.find(i => i.type === 'chart');
      if (chart) {
        const nextValue = Math.floor(Math.random() * 50);
        const nextTime = new Date().toLocaleTimeString();
        chart.data.push({ time: nextTime, value: nextValue });
        if (chart.data.length > 10) chart.data.shift(); // keep last 10 points
      }
    });
  }

  addWidget() {
    const id = 'widget-' + Date.now();
    const newWidget: DashboardItem = {
      cols: 2,
      rows: 2,
      y: 0,
      x: 0,
      type: 'info',
      id,
      title: 'New Widget',
      data: 'This is a dynamically added widget'
    };
    this.dashboardItems = [...this.dashboardItems, newWidget];
  }

  removeWidget(id: string) {
    this.dashboardItems = this.dashboardItems.filter(item => item.id !== id);
  }
}