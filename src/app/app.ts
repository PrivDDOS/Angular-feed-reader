import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

type Feed = { title: string; feedUrl: string; siteUrl: string; description: string; format: string; notes: string };
type Category = { name: string; color: string ;feeds: Feed[] };

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
  categories: Category[] = [];
  filterData: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<{ categories: Category[] }>('/data/sample-feeds.json').subscribe(res => {
      this.categories = res.categories;
      this.filterData = [res.categories]
      this.cdr.detectChanges()
      console.log(this.categories)
    });
  };

  get totalFeeds(): number {
    return this.categories.reduce(
      (total, category) => total + category.feeds.length, 0
    );
  }

}
