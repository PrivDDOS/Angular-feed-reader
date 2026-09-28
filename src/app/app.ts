import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-feed');

  activeTab: 'Feed' | 'Digest' | 'Discover' = 'Feed';
  name: any[] = [];
  feed: any[] = [];
  filterData: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<{ categories: { name: string; feeds: any[] }[] }>('/data/sample-feeds.json').subscribe(res => {
      this.name = res.categories.flatMap(category => category.name);
      this.feed = res.categories.flatMap(category => category.feeds)
      this.filterData = [res.categories]
      this.cdr.detectChanges()
      console.log(this.name, this.feed)
    });
  };

}
