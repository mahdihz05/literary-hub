import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, Search, Library, ShoppingBag, UserRound, Menu, Bell, BookOpen,
  Play, Heart, Star, Eye, ChevronLeft, ChevronRight, PenLine, Headphones,
  Mic2, Film, Moon, Sun, X, Plus, LayoutDashboard, Bookmark, ShoppingCart,
  Sparkles, TrendingUp, Users, WalletCards, MoreHorizontal, SlidersHorizontal,
  ArrowRight, Type, Minus, Check, LogOut, Settings, MessageCircle
} from 'lucide-react';
import './styles.css';

const IMG = {
  hero: '/assets/hero.jpg',
  book1: '/assets/book-1.jpg',
  book2: '/assets/book-2.jpg',
  book3: '/assets/book-3.jpg',
  book4: '/assets/book-4.jpg',
  author: '/assets/author.jpg'
};

const books = [
  { title: 'سمفونی مردگان', author: 'عباس معروفی', image: IMG.book1, price: '۱۲۰٬۰۰۰', rating: '۴.۹', tag: 'پرفروش' },
  { title: 'بوف کور', author: 'صادق هدایت', image: IMG.book2, price: '۸۵٬۰۰۰', rating: '۴.۸', tag: 'ویژه' },
  { title: 'منِ او', author: 'رضا امیرخانی', image: IMG.book3, price: '۹۸٬۰۰۰', rating: '۴.۷', tag: 'تازه' },
  { title: 'چشم‌هایش', author: 'بزرگ علوی', image: IMG.book4, price: '۷۶٬۰۰۰', rating: '۴.۶', tag: 'منتخب' }
];

function App() {
  const [page, setPage] = useState('home');
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState([0, 1, 3]);
  const [readerSize, setReaderSize] = useState(20);

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2200); return () => clearTimeout(t); }, [toast]);

  const navigate = (next) => { setPage(next); setMenu(false); };
  const addToCart = () => { setCart(true); setToast('سمفونی مردگان به سبد خرید اضافه شد'); };
  const toggleSave = (i) => setSaved(v => v.includes(i) ? v.filter(x => x !== i) : [...v, i]);

  const content = useMemo(() => ({
    home: <HomePage navigate={navigate} />,
    explore: <ExplorePage query={query} setQuery={setQuery} navigate={navigate} saved={saved} toggleSave={toggleSave} />,
    library: <LibraryPage navigate={navigate} saved={saved} toggleSave={toggleSave} />,
    store: <StorePage addToCart={addToCart} saved={saved} toggleSave={toggleSave} />,
    profile: <ProfilePage navigate={navigate} />,
    dashboard: <Dashboard />,
    reader: <Reader size={readerSize} setSize={setReaderSize} navigate={navigate} />
  })[page], [page, query, saved, readerSize]);

  if (page === 'reader') return <>{content}{toast && <Toast text={toast} />}</>;

  return (
    <div className="app-shell">
      <Header page={page} navigate={navigate} dark={dark} setDark={setDark} menu={menu} setMenu={setMenu} cart={() => setCart(true)} />
      <main>{content}</main>
      <BottomNav page={page} navigate={navigate} />
      {menu && <MenuDrawer navigate={navigate} close={() => setMenu(false)} />}
      {cart && <CartDrawer close={() => setCart(false)} />}
      {toast && <Toast text={toast} />}
    </div>
  );
}

function Header({ page, navigate, dark, setDark, menu, setMenu, cart }) {
  return <header className="topbar">
    <button className="icon-btn mobile-only" onClick={() => setMenu(!menu)} aria-label="منو"><Menu /></button>
    <button className="brand" onClick={() => navigate('home')}>دیوان<span>●</span></button>
    <nav className="desktop-nav">
      {[['home','خانه'],['explore','کشف آثار'],['library','کتابخانه'],['store','فروشگاه']].map(([id,label]) => <button className={page===id?'active':''} onClick={() => navigate(id)} key={id}>{label}</button>)}
    </nav>
    <div className="header-actions">
      <button className="icon-btn" onClick={() => navigate('explore')} aria-label="جستجو"><Search /></button>
      <button className="icon-btn" onClick={cart} aria-label="سبد خرید"><ShoppingBag /><i>۱</i></button>
      <button className="icon-btn desktop-only" onClick={() => setDark(!dark)} aria-label="تغییر پوسته">{dark ? <Sun/> : <Moon/>}</button>
      <button className="avatar-btn desktop-only" onClick={() => navigate('profile')}><img src={IMG.author} alt="پروفایل" /></button>
    </div>
  </header>;
}

function HomePage({ navigate }) {
  return <div className="page home-page">
    <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(15,13,19,.2),rgba(15,13,19,.94)),url(${IMG.hero})`}}>
      <div className="hero-copy"><span className="eyebrow"><Sparkles/> اثر ویژه هفته</span><h1>شب‌های نیلوفری</h1><p>درامی نفس‌گیر در دل تاریخ؛ جایی که عشق و خیانت در هم می‌آمیزند و سرنوشت آدم‌ها دوباره نوشته می‌شود.</p><div className="hero-actions"><button className="primary-btn" onClick={() => navigate('reader')}><BookOpen/> شروع مطالعه</button><button className="glass-btn" onClick={() => navigate('explore')}>جزئیات اثر</button></div></div>
    </section>
    <SectionTitle title="ادامه مطالعه" link="کتابخانه من" onClick={() => navigate('library')} />
    <div className="continue-card"><img src={IMG.book4}/><div><span>چشم‌هایش</span><small>بزرگ علوی · فصل ششم</small><div className="progress"><i style={{width:'65%'}}/></div><small>۶۵٪ مطالعه شده</small></div><button className="round-play" onClick={() => navigate('reader')}><Play/></button></div>
    <div className="quick-grid"><button onClick={() => navigate('explore')}><span className="quick-icon purple"><Sparkles/></span><b>کشف آثار تازه</b><small>پیشنهادهایی برای سلیقه شما</small></button><button onClick={() => navigate('profile')}><span className="quick-icon gold"><TrendingUp/></span><b>نویسندگان برتر</b><small>محبوب‌ترین قلم‌های این ماه</small></button></div>
    <SectionTitle title="محبوب میان خوانندگان" link="مشاهده همه" onClick={() => navigate('explore')} />
    <BookGrid compact navigate={navigate} />
  </div>;
}

function ExplorePage({ query, setQuery, navigate, saved, toggleSave }) {
  const filtered = books.filter(b => (b.title+b.author).includes(query));
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">جستجو و کشف</span><h1>داستان بعدی‌ات را پیدا کن</h1><p>میان هزاران داستان، رمان و شعر فارسی جستجو کن.</p></div></div>
    <div className="search-box"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="نام کتاب، نویسنده یا ژانر..."/><button><SlidersHorizontal/> فیلترها</button></div>
    <div className="chips">{['همه','رمان و داستان','شعر و ادبیات','تاریخی','فلسفه و تفکر','علمی‌تخیلی'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}</div>
    <SectionTitle title={query ? `نتایج برای «${query}»` : 'پیشنهادهای ویژه'} link={`${filtered.length || 0} اثر`} />
    <BookGrid booksList={filtered} saved={saved} toggleSave={toggleSave} navigate={navigate}/>
  </div>;
}

function LibraryPage({ navigate, saved, toggleSave }) {
  return <div className="page"><div className="page-heading split"><div><span className="eyebrow">فضای شخصی شما</span><h1>کتابخانه من</h1><p>همه داستان‌هایی که دوست داشته‌اید، یک‌جا.</p></div><div className="stat-pill"><BookOpen/><span><b>۱۲</b> کتاب در قفسه</span></div></div>
    <div className="library-tabs"><button className="active">در حال مطالعه</button><button>ذخیره‌شده‌ها</button><button>تمام‌شده</button></div>
    <div className="reading-list">{books.slice(0,3).map((b,i)=><article key={b.title}><img src={b.image}/><div className="reading-main"><span className="tag">{i===0?'فصل ۶ از ۹':'فصل ۲ از ۱۲'}</span><h3>{b.title}</h3><p>{b.author}</p><div className="progress"><i style={{width:`${65-i*18}%`}}/></div><small>{65-i*18}٪ خوانده شده</small></div><button className="primary-btn" onClick={()=>navigate('reader')}><Play/> ادامه</button><button className="icon-btn" onClick={()=>toggleSave(i)}><Bookmark fill={saved.includes(i)?'currentColor':'none'}/></button></article>)}</div>
  </div>;
}

function StorePage({ addToCart, saved, toggleSave }) {
  return <div className="page store-page"><section className="store-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(20,18,24,.16),rgba(20,18,24,.94)),url(${IMG.book1})`}}><span className="eyebrow">اثر برگزیده هفته</span><h1>سمفونی مردگان</h1><p>داستانی عمیق و تأمل‌برانگیز از زوال یک خانواده؛ شاهکاری فراموش‌نشدنی از عباس معروفی.</p><div><button className="primary-btn" onClick={addToCart}><ShoppingCart/> خرید مستقیم · ۱۲۰٬۰۰۰ تومان</button><button className="glass-btn">جزئیات</button></div></section>
    <SectionTitle title="دسته‌بندی‌ها" />
    <div className="category-grid">{[[BookOpen,'رمان و داستان'],[PenLine,'شعر و ادبیات'],[TrendingUp,'فلسفه و تفکر'],[Headphones,'کتاب صوتی']].map(([Icon,t])=><button key={t}><Icon/><b>{t}</b></button>)}</div>
    <SectionTitle title="پیشنهادهای ویژه" link="مشاهده همه" />
    <BookGrid saved={saved} toggleSave={toggleSave} store addToCart={addToCart}/>
  </div>;
}

function ProfilePage({ navigate }) {
  return <div className="page profile-page"><section className="profile-cover"><div className="profile-orb"><img src={IMG.author}/></div><div><span className="eyebrow">نویسنده منتخب</span><h1>حافظ شیرازی <Check/></h1><p>@hafez · شاعر و غزل‌سرای ایرانی</p></div><button className="primary-btn"><Plus/> دنبال کردن</button><button className="glass-btn"><MessageCircle/> پیام</button></section>
    <div className="profile-stats"><span><b>۱۲۸</b> اثر</span><span><b>۲۴٫۸K</b> دنبال‌کننده</span><span><b>۱٫۲M</b> بار خوانده‌شده</span><span><b>۴٫۹</b> امتیاز</span></div>
    <section className="bio"><h2>درباره نویسنده</h2><p>خواجه شمس‌الدین محمد حافظ شیرازی، شاعر بزرگ سده هشتم ایران و یکی از سخنوران نامی جهان است. غزل‌های او سرشار از عشق، عرفان و زیبایی زبان فارسی‌اند.</p></section>
    <div className="profile-actions"><button onClick={()=>navigate('dashboard')}><LayoutDashboard/> مشاهده پیشخوان دمو</button><button><PenLine/> تازه‌ترین نوشته‌ها</button><button><Headphones/> اجراهای صوتی</button></div>
    <SectionTitle title="آثار منتشرشده" link="همه آثار"/><BookGrid compact navigate={navigate}/>
  </div>;
}

function Dashboard() {
  return <div className="page dashboard-page"><div className="page-heading split"><div><span className="eyebrow">پیشخوان نویسنده</span><h1>سلام، فردوسی 👋</h1><p>عملکرد آثار و فروش شما در ۳۰ روز گذشته</p></div><button className="primary-btn"><Plus/> اثر تازه</button></div>
    <div className="metrics"><Metric Icon={Eye} title="بازدید امروز" value="۲٬۴۵۰" trend="۱۲٪ رشد"/><Metric Icon={ShoppingBag} title="فروش ویژه" value="۱۲" trend="۳ سفارش تازه"/><Metric Icon={Users} title="دنبال‌کنندگان" value="۸۴۵" trend="۲۸ نفر جدید"/><Metric Icon={WalletCards} title="درآمد ماه" value="۸٫۶ میلیون" trend="قابل تسویه"/></div>
    <div className="dashboard-grid"><section className="chart-card"><div className="card-head"><div><h2>روند مطالعه آثار</h2><p>هفت روز گذشته</p></div><MoreHorizontal/></div><div className="bars">{[42,66,50,85,70,92,76].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><small>{['ش','ی','د','س','چ','پ','ج'][i]}</small></div>)}</div></section><section className="activity-card"><h2>فعالیت‌های اخیر</h2>{[['کتاب جدید اضافه شد','سمفونی مردگان'],['دیدگاه تازه','برای فصل ششم چشم‌هایش'],['تسویه انجام شد','۲٬۸۵۰٬۰۰۰ تومان']].map(([a,b],i)=><div className="activity" key={a}><span>{i===0?<BookOpen/>:i===1?<MessageCircle/>:<WalletCards/>}</span><p><b>{a}</b><small>{b}</small></p><em>{i===0?'۱۰ دقیقه پیش':i===1?'۱ ساعت پیش':'دیروز'}</em></div>)}</section></div>
    <section className="works-table"><div className="card-head"><h2>آثار من</h2><button>مدیریت همه</button></div>{books.slice(0,3).map((b,i)=><div className="work-row" key={b.title}><img src={b.image}/><p><b>{b.title}</b><small>{i?'پیش‌نویس':'منتشرشده'}</small></p><span><Eye/> {['۱۲٫۴K','۸٫۱K','۳٫۹K'][i]}</span><span><Star/> {b.rating}</span><button className="icon-btn"><MoreHorizontal/></button></div>)}</section>
  </div>;
}

function Reader({ size, setSize, navigate }) {
  return <div className="reader-page"><div className="read-progress"/><header className="reader-head"><button className="icon-btn" onClick={()=>navigate('library')}><ArrowRight/></button><div><b>دیوان حافظ</b><small>غزل شماره ۱</small></div><div><button className="icon-btn" onClick={()=>setSize(Math.max(16,size-1))}><Minus/></button><button className="reader-size"><Type/> {size}</button><button className="icon-btn" onClick={()=>setSize(Math.min(26,size+1))}><Plus/></button><button className="icon-btn"><Bookmark/></button></div></header><article className="poem" style={{fontSize:size}}><span>دیوان حافظ</span><h1>غزل شماره ۱</h1><p>الا یا ایها الساقی ادر کاساً و ناولها<br/>که عشق آسان نمود اول ولی افتاد مشکل‌ها</p><p>به بوی نافه‌ای کاخر صبا زان طره بگشاید<br/>ز تاب جعد مشکینش چه خون افتاد در دل‌ها</p><p>مرا در منزل جانان چه امن عیش چون هر دم<br/>جرس فریاد می‌دارد که بربندید محمل‌ها</p><p>به می سجاده رنگین کن گرت پیر مغان گوید<br/>که سالک بی‌خبر نبود ز راه و رسم منزل‌ها</p><p>شب تاریک و بیم موج و گردابی چنین هایل<br/>کجا دانند حال ما سبکباران ساحل‌ها</p><p>همه کارم ز خودکامی به بدنامی کشید آخر<br/>نهان کی ماند آن رازی کز او سازند محفل‌ها</p><p>حضوری گر همی‌خواهی از او غایب مشو حافظ<br/>متی ما تلق من تهوی دع الدنیا و اهملها</p></article><footer className="reader-footer"><button><ChevronRight/> غزل قبلی</button><span>صفحه ۱۲ از ۲۴</span><button>غزل بعدی <ChevronLeft/></button></footer></div>;
}

function BookGrid({ booksList=books, saved=[], toggleSave=()=>{}, compact=false, navigate=()=>{}, store=false, addToCart=()=>{} }) { return <div className={`book-grid ${compact?'compact':''}`}>{booksList.map((b,i)=><article className="book-card" key={b.title}><div className="book-cover"><img src={b.image} alt={b.title}/><span>{b.tag}</span><button onClick={()=>toggleSave(i)}><Bookmark fill={saved.includes(i)?'currentColor':'none'}/></button><div className="book-hover"><button onClick={()=>store?addToCart():navigate('reader')}>{store?<ShoppingCart/>:<BookOpen/>}{store?'افزودن به سبد':'شروع مطالعه'}</button></div></div><h3>{b.title}</h3><p>{b.author}</p><div className="book-meta"><span><Star fill="currentColor"/> {b.rating}</span>{store?<b>{b.price} تومان</b>:<span><Eye/> ۱۲٫۴ هزار</span>}</div></article>)}</div> }
function SectionTitle({ title, link, onClick }) { return <div className="section-title"><h2>{title}</h2>{link&&<button onClick={onClick}>{link}<ChevronLeft/></button>}</div> }
function Metric({Icon,title,value,trend}) { return <article className="metric"><span><Icon/></span><p>{title}</p><b>{value}</b><small>{trend}</small></article> }
function BottomNav({page,navigate}) { const items=[[Home,'home','خانه'],[Search,'explore','جستجو'],[Library,'library','کتابخانه'],[ShoppingBag,'store','فروشگاه'],[UserRound,'profile','پروفایل']]; return <nav className="bottom-nav">{items.map(([Icon,id,t])=><button onClick={()=>navigate(id)} className={page===id?'active':''} key={id}><Icon/><span>{t}</span></button>)}</nav> }
function MenuDrawer({navigate,close}) { return <><div className="scrim" onClick={close}/><aside className="drawer menu-drawer"><div className="drawer-head"><b>دیوان</b><button className="icon-btn" onClick={close}><X/></button></div>{[[Home,'home','خانه'],[Search,'explore','کشف آثار'],[Library,'library','کتابخانه من'],[ShoppingBag,'store','فروشگاه'],[PenLine,'dashboard','پیشخوان نویسنده'],[UserRound,'profile','پروفایل']].map(([Icon,id,t])=><button onClick={()=>navigate(id)} key={id}><Icon/>{t}<ChevronLeft/></button>)}</aside></> }
function CartDrawer({close}) { return <><div className="scrim" onClick={close}/><aside className="drawer cart-drawer"><div className="drawer-head"><b>سبد خرید</b><button className="icon-btn" onClick={close}><X/></button></div><div className="cart-item"><img src={IMG.book1}/><p><b>سمفونی مردگان</b><small>نسخه دیجیتال</small><span>۱۲۰٬۰۰۰ تومان</span></p><button className="icon-btn"><X/></button></div><div className="cart-total"><span>مبلغ نهایی</span><b>۱۲۰٬۰۰۰ تومان</b></div><button className="primary-btn wide">ادامه و پرداخت</button><small className="demo-note">پرداخت در نسخه نمایشی غیرفعال است.</small></aside></> }
function Toast({text}) { return <div className="toast"><Check/>{text}</div> }

createRoot(document.getElementById('root')).render(<App/>);
