import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write-it-back',
  templateUrl: './write-it-back.component.html',
})
export class WriteItBackComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  chartCreationData: monthChartData[] = [{month:0}];
  chartCustomerCreationUrl = 'https://localhost:44350/api/Alicilar/AliciChart';
  chartData = {
    labels: ['Ocak', 'Subat', 'Mart', 'Nisan', 'Mayis', 'Haziran', 'Temmuz', 'Agustos', 'Eylul', 'Ekim', 'Kasim', 'Aralik'],
    datasets: [{
      label: 'Yeni Kullanicilar',
      data: [],
      borderColor: [
        '#E2841A',
      ],
      borderWidth: 3,
      fill: false,
      tension: .4
    }]
  };

  chartOptions = {
    responsive: true,
    hover: {
      mode: 'index'
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }
    }
  };

  getCustomerCreationDatas() {
    this.httpClient.get<monthChartData[]>(this.chartCustomerCreationUrl).toPromise().then((data) => {
      this.chartCreationData = data;
      console.log(data)
    }).
      catch((err) => { console.error(err) }).
      finally(() => { console.log('Finished') })
  }

  ngOnInit(): void {
    this.getCustomerCreationDatas();
    
  }


}

export interface monthChartData {
  month: number;
}