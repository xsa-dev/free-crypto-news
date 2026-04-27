import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Posts from '@/components/Posts';
import Footer from '@/components/Footer';
import { getLatestNews } from '@/lib/crypto-news';
import { analyzeSentiment } from '@/lib/sentiment';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  timeAgo: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  tickers?: string[];
}

export const revalidate = 3600;

export default async function Home() {
  const data = await getLatestNews(50);
  
  const articles: Article[] = data.articles.map(article => {
    const text = `${article.title} ${article.description || ''}`;
    const sentimentResult = analyzeSentiment(text);
    
    let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    if (sentimentResult.score > 0.3) sentiment = 'bullish';
    else if (sentimentResult.score < -0.3) sentiment = 'bearish';
    
    return {
      title: article.title,
      link: article.link,
      pubDate: article.pubDate,
      source: article.source,
      timeAgo: article.timeAgo,
      sentiment,
    };
  });
  
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <Posts articles={articles} />
      <hr className="bg-gray-300 w-[95%] mt-12 h-[0.5px] mx-auto" />
      <Footer />
    </div>
  );
}
