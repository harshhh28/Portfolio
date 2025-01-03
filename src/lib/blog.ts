// Blog post types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Blog posts data
export const blogPosts: Record<string, BlogPost> = {
  'http-module-vs-express': {
    slug: 'http-module-vs-express',
    title: 'Http Module v/s Express',
    excerpt: 'If the http module were a person...',
    content: `
    
    If the http module were a person:
    - No frills, just raw power.
    - Want routing? Do it yourself.
    - Loves simplicity but makes you work for it.
    - Use it if you want to feel like a true Node.js ninja.

    Express is like that friend who:
    - Handles your plans (routing) effortlessly.
    - Brings snacks (middleware) to every party.
    - Speeds things up and makes you look good.
    - Why work hard when Express makes it easy?
    `,
    date: '02-01-2025',
    readTime: '2 min read',
    tags: ['node.js', 'http', 'express'],
  },
  'gst-and-popcorn': {
    slug: 'gst-and-popcorn',
    title: 'GST and Popcorn: A Love Story 🍿',
    excerpt: 'Ever wondered why some people don’t buy popcorn at the theater?...',
    content: `
    
    Ever wondered why some people don’t buy popcorn at the theater? Because GST is in love with popcorn, and every flavor gets its own "princess" treatment.

    Normal Popcorn: 5% GST. This one’s like your childhood love. Simple, straightforward, and low-maintenance.
    Salted Popcorn: 12% GST. Things are getting serious here. Turns now, sprinkling salt is now a luxury move. It’s a salty affair.
    Caramelized Popcorn: 18% GST. This is the Bollywood drama of popcorn. High-maintenance, over-the-top, and definitely expensive.
    Finance Minister's logic: "As the flavor gets richer, so does the GST." We just wanted some snacks, not a tax lesson.
    A plea from the people: "Dear GST Council, please don’t make popcorn so expensive that we forget the joy of eating it while watching a love story in a theatre."
    In the end: The love story between GST and popcorn is like every complicated romance - confusing, expensive, and impossible to understand.
    `,
    date: '26-12-2024',
    readTime: '7 min read',
    tags: ['GST', 'popcorn'],
  },
  'jinja2-and-caching-in-django': {
    slug: 'jinja2-and-caching-in-django',
    title: 'Jinja2 and Browser Caching Issues in Django',
    excerpt: 'So, it took me more than an hour to debug why my CSS was not getting loaded...',
    content: `
    
    1) fixed A LOT OF templating errors
    2) Jinja2 makes the layout so damn smooth (https://chaicode.com/blogs/jinja-templates-and-apps-in-django)
    3) creating apps (urls(project)->urls(app), etc.)
    4) CSS and browser caching.

    So, it took me more than an hour to debug why my CSS was not getting loaded even after changing and saving it 10 times! I tried many approaches including:
    1) adding STATICFILES_STORAGE
    2) adding (update cache) MIDDLEWARES
    But none worked.

    In the end, got it solved by adding "?v={{ STATIC_VERSION }}" after {% static 'style.css' %}.
    What it does? - It helps to bust the cached (old version of your CSS) and force the browser to download the latest version.
    `,
    date: '27-09-2024',
    readTime: '6 min read',
    tags: ['django', 'python', 'backend'],
  },
  'the-file-structure-of-django': {
    slug: 'the-file-structure-of-django',
    title: 'The File Structure of Django',
    excerpt: 'The File structure of Django mainly consists of...',
    content: `
      The File structure of Django mainly consists of:
      
      1) django-admin startproject command
      2) basic flow of django
      user -> req -> urls (-> app urls) -> views
      views (-> db, temp, direct) -> res -> user
      3) templates, static
      4) templating engines (load static, etc.)
    `,
    date: '24-09-2024',
    readTime: '2 min read',
    tags: ['django', 'python', 'backend'],
  },
  'the-basics-of-django': {
    slug: 'the-basics-of-django',
    title: 'The Basics of Django',
    excerpt: 'Started learning django few days back, here is what I learnt...',
    content: `
      Started learning django few days back, here's what I learnt:

      1) use uv pip/pip3 (rapidly fast)
      2) how to create a virtual env
      3) advantages of django (https://djangoproject.com)
      4) if port occupied, type "manage.py runserver 8001 (portno.)"
    `,
    date: '23-09-2024',
    readTime: '2 min read',
    tags: ['django', 'python', 'backend'],
  },
};