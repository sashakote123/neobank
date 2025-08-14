import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import useGetNews from './hooks/useGetNews';
import News from './News';

jest.mock('axios');
jest.mock('@/src/widgets/news/hooks/useGetNews');

const mockNewsData = [
  {
    article_id: 'da31a8516ca46361bd869f28a977ae5f',
    title: 'Household Debt Rises to $18.39 Trillion as Auto, Mortgage Originations Tick Up',
    link: 'https://biztoc.com/x/bb02d2a162897839',
    description:
      'U.S. household debt increased by $185 billion in Q2 2025, reaching a record $18.39 trillion, according to the Federal Reserve Bank of New York. [contact-form-7] Mortgage balances led the rise, growing by $131 billion to $12.94 trillion as housing activity remained stable despite...',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: 'https://biztoc.com/cdn/950/og.png',
  },
  {
    article_id: '9706403b440079209587de298dc4e310',
    title: 'Vancouver home sales tick 2% lower in July with market ‘turning a corner’: board',
    link: 'https://www.bnnbloomberg.ca/business/2025/08/06/vancouver-home-sales-tick-2-lower-in-july-with-market-turning-a-corner-board/',
    description:
      'Vancouver-area home sales were down two per cent in July compared with last year, as the city’s real estate board says it continues to believe the market is showing early signs of recovery.',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url:
      'https://www.bnnbloomberg.ca/resizer/v2/ORJWXVWZ74KXE4KNNBI4OFVCA4.jpg?auth=5dfa8046e2f428a981387f42f373c344ff1621cede2e400de802cce4aac94e6c&height=906&smart=true&width=1400',
  },
  {
    article_id: '9feb822f3f47698bd0cb6f13f4128ad3',
    title: 'Japan’s Real Wage Falls for Sixth Straight Month in June',
    link: 'https://japannews.yomiuri.co.jp/business/economy/20250806-273977/',
    description:
      "TOKYO, Aug 6 (Reuters) - Japan's real wages fell in June for the sixth consecutive month as inflation continued to outpace pay growth, government data showed on Wednesday, raising concerns about consumption-led recovery in the world's fourth-largest economy.",
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url:
      'https://japannews.yomiuri.co.jp/wp-content/uploads/2025/08/2025-08-04T103940Z_1453812875_RC2QM0AMLP4P_RTRMADP_3_JAPAN-ECONOMY-WAGES.jpg',
  },
  {
    article_id: 'f5bfc52c36b3cd60b7acc15a87cdc527',
    title: 'World Bank claims 23% mobile phones have SIM cards with wrong identities',
    link: 'https://guardian.ng/technology/world-bank-claims-23-mobile-phones-have-sim-cards-with-wrong-identities/',
    description:
      'The World Bank has alerted that 23 per cent of mobile phone owners have SIM cards in their phones that are registered in others’ names.The bank, which said this challenge is largely specific to low- and middle-income economies,...The post World Bank claims 23% mobile phones have SIM cards with wrong identities appeared first on The Guardian Nigeria News - Nigeria and World News.',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: 'https://cdn.guardian.ng/wp-content/uploads/2020/03/SIM-cards.jpg',
  },
  {
    article_id: '7e9ae8333b0dbca95b9865ce80a9f1a8',
    title:
      'Business Process Outsourcing Services Market To Hit USD 603.4 Billion By 2032, Efficient Solutions For BPO Services',
    link: 'https://menafn.com/1109891100/Business-Process-Outsourcing-Services-Market-To-Hit-USD-6034-Billion-By-2032-Efficient-Solutions-For-BPO-Services',

    description:
      '(MENAFN - EIN Presswire)Business Process Outsourcing (BPO) Services MarketExplore the Business Process Outsourcing (BPO) services market overview, segmentation, key drivers, opportunities, ...',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: null,
  },
  {
    article_id: '42c32c490de4d97bd970d9d8c2d6342a',
    title:
      'From Swadeshi call by Tilak to Atmanirbhar Bharat by PM Modi: A century-old movement finds new fire amidst tariff war',
    link: 'https://organiser.org/2025/08/06/306511/bharat/from-swadeshi-call-by-tilak-to-atmanirbhar-bharat-by-pm-modi-a-century-old-movement-finds-new-fire-amidst-tariff-war/',
    description:
      'Nearly 120 years after Lokmanya Bal Gangadhar Tilak first ignited the flame of Swadeshi, India is witnessing a powerful resurgence of the same spirit under Prime Minister Narendra Modi’s leadership. On August 1, the nation observed Tilak’s death anniversary, remembering the man who gave Indians a blueprint for economic and intellectual self-reliance at the height of British colonial domination. Just a day later, on August 2 in Varanasi, Prime Minister Modi rekindled that historic call, urging citizens to ensure that “every new thing that comes into our homes should be Swadeshi.” Far from being a mere patriotic slogan, Modi’s appeal was a clear assertion of economic sovereignty at a time when global geopolitics is fraught with trade wars and tariff sanctions. 🚨 BIG MESSAGE PM Modi: “With Diwali & wedding season ahead, let’s vow to BUY only Swadeshi products.” 🇮🇳 “This is true service to the nation. I urge everyone — ‘Wed in India’, don’t let India’s wealth flow abroad.” 🪔💍 pic.twitter.com/WznWQfdhGa — Megh Updates 🚨TM (@MeghUpdates) August 2, 2025 Tariff wars, U.S. threats, and a century-old answer As trade tensions with the U.S. escalate and new tariff regimes threaten India’s export markets, the concept of Swadeshi, once born as an anti-colonial weapon, has transformed into a strategic shield for economic independence. The Modi government’s push for Atmanirbhar Bharat and ‘Make in India’ echoes the century-old ideology of resisting foreign dominance through indigenous strength. Tilak’s Trisutri: Then and now Back in the early 20th century, Tilak introduced his Trisutri (three-fold program), a vision that combined political, economic, and cultural sovereignty: Swaraj: Self-governance and political freedom Swadeshi: Promotion of indigenous goods and industries National Education: Learning rooted in Indian ethos and values For Tilak, these were not slogans but a practical roadmap to dismantle British hegemony. The Swadeshi movement of 1905, which erupted after Lord Curzon’s partition of Bengal, became a psychological revolution. It asked Indians to boycott foreign goods, build local industries, and restore cultural pride. Fast forward to 2025, Swadeshi is no longer a throwback; it is an economic compulsion. With the fragility of global supply chains exposed, Western economic pressure mounting, and tariff wars intensifying, India’s pivot to domestic manufacturing and indigenous innovation is not a retreat into the past, but a resilient leap forward. Prime Minister Modi’s call to “buy Swadeshi” during the festive and wedding season is more than symbolic; it is a battle cry for economic independence, urging citizens to keep India’s wealth within its borders. From Tilak’s boycott of British textiles to Modi’s push for local production, the journey of Swadeshi has come full circle, now powered by global ambitions and digital-age strategies. U.S. tariffs and a renewed economic nationalism The recent application of retaliatory tariffs by the United States against Indian exports has set in motion a spasm of introspection and determination within Bharat. U.S. President Donald Trump’s statement that India is a “dead economy” did not simply elicit political outrage; it spurred a national reassertion of economic sovereignty. Addressing these changing world dynamics from the ancient city of Kashi on August 2, Prime Minister Narendra Modi did so with a clarity. “Today, the world economy is going through many apprehensions, and there is an atmosphere of instability. In such a situation, the countries of the world are focusing on their respective interests. They are focusing on the interests of their respective countries. India is also going to become the third-largest economy of the world. Therefore, India also has to be vigilant about its economic interests. The interests of our farmers, our small industries, and the employment of our youth are of paramount importance to us”. #WATCH | Earlier today in Varanasi, PM Narendra Modi began his address with the chant “Namah Parvati Pataye, Har Har Mahadev,” followed by greetings in Bhojpuri.#NarendraModi #Varanasi pic.twitter.com/OHjhlZdUqB — Organiser Weekly (@eOrganiser) August 2, 2025 Amidst this geopolitical uncertainty and economic instability, Modi’s appeal for Swadeshi was not merely an obeisance to tradition; it was a calculated counter-narrative to outside pressure. He appealed to every Indian, irrespective of political persuasion, to awaken a feeling of economic responsibility. His appeal was direct: “Now, whatever we purchase, there should be only one scale; we will purchase what is produced by the sweat of an Indian.” This call to action was not merely about consumer consumption; it was a larger cultural and economic phenomenon. From rallying citizens to buy Make in India products to requesting shopkeepers to stock only domestic products, Modi emphasised that economic nationalism has to be a collective movement. The festive season ahead, he stated, should be spent celebrating by embracing Vocal for Local in every transaction, every wedding, every ornamentation, and every choice. In calling for Swadeshi not only as a policy but as a mass movement, Modi comes straight into line with the vision of Bal Gangadhar Tilak, one in which economic self-sufficiency is as important as political freedom. Amidst a time when global supply chains are weaponised and tariffs become diplomatic tools, India’s approach is unequivocal: resilience rather than retaliation, production rather than reliance, and unity rather than vulnerability. Also Read: Bharat Stands Firm: Trade, tariffs, and national interest Economic vision: Swadeshi in action Since 2014, PM Modi has initiated a sequence of economic and policy reforms along the lines of Swadeshi values: 1) Make in India (2014): To encourage domestic manufacturing. 2) Startup India (2016): To encourage innovation and entrepreneurship. 3) Aatmnirbhar Bharat Abhiyan (2020): Self-reliance mission during the COVID-19 pandemic. 4) PLI Schemes (Production Linked Incentives): To lure global companies to manufacture in India. 5) Digital India: To narrow down the digital gap and build local tech ecosystems. These programmes, supported by fiscal incentives, deregulation, and infrastructure investment, have driven growth in sensitive sectors such as semiconductors, electronics, defence, green energy, and EVs. India’s Global Rise: A swadeshi outcome Even in spite of the global economic slowdown, India became the world’s fastest-growing major economy. According to a report published in moneycontrol on 1 August, 2025 following trump’s dead economy comment “India’s economy [...]',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url:
      'https://organiser.org/wp-content/uploads/2025/08/esakal_2023-07_b3296728-61bf-47ab-ae31-1fa3135d44d3_untitled_design.webp',
  },
  {
    article_id: '1c980b5a6738eb01ca3051eb9c3363e7',
    title: 'Sports Looking Back: Aug. 6, 2025',
    link: 'https://www.brandonsun.com/sports/2025/08/05/sports-looking-back-aug-6-2025',
    description:
      'ON TELEVISION • MLB — Toronto at Colorado, 2 p.m. (SNW); Milwaukee at Atlanta, 6 p.m. (TSN1) • SOCCER — In Leagues Cup, Atlanta United vs. Atlas, 6:30 p.m. (TSN3) • GOLF — U.S. Women’s Amateur, 5 p.',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: 'https://www.brandonsun.com/wp-content/uploads/sites/3/2022/11/squaresun_web.jpg',
  },
  {
    article_id: '1cbd8fd5ae60bada898246d3faccec93',
    title: 'Iloilo City steps up market vendor empowerment thru Una, Sige',
    link: 'https://www.sunstar.com.ph/iloilo/iloilo-city-steps-up-market-vendor-empowerment-thru-una-sige',
    description:
      'The Iloilo City Government is intensifying its support for market vendors by providing essential business training for long-term livelihood sustainability.',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url:
      'https://media.assettype.com/sunstar%2F2025-08-06%2Ff7c1q44t%2FUna-Sige-program-Iloilo.jpg?auto=format%2Ccompress&fit=max&rect=0%2C0%2C750%2C422&w=480',
  },
  {
    article_id: '03439b4fec4390b6bfbd7b87ee44c761',
    title:
      'RBI To Make Process Easy For Legal Heirs Claiming Money From Bank Accounts Of Deceased Customers',
    link: 'https://menafn.com/1109891076/RBI-To-Make-Process-Easy-For-Legal-Heirs-Claiming-Money-From-Bank-Accounts-Of-Deceased-Customers',

    description:
      '(MENAFN - IANS) Mumbai, Aug 6 (IANS) The Reserve Bank of India (RBI) announced on Wednesday that it has decided to standardise and simplify the procedure for settlement of claims in respect of ...',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: 'https://menafn.com/updates/pr/2025-08/06/I_ff7adimage_story.jpg',
  },
  {
    article_id: 'c06974b3f6baa6394814d47158e3bdbb',
    title: 'Indian shares set to open flat ahead of RBI policy decision',
    link: 'https://www.livemint.com/market/stock-market-news/indian-shares-set-to-open-flat-ahead-of-rbi-policy-decision-11754448305977.html',

    description:
      'INDIA-STOCKS/:INDIA STOCKS-Indian shares set to open flat ahead of RBI policy decision',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDateTZ: 'UTC',
    image_url: 'https://www.livemint.com/lm-img/static/1yr/newmintdefault-120.png',
  },
];

describe('News', () => {
  const mockUseGetNews = useGetNews;
  beforeEach(() => {
    mockUseGetNews.mockReset();
  });

  test('Отображает новости при успешном запросе', async () => {
    mockUseGetNews.mockReturnValue({
      data: mockNewsData,
      isLoading: false,
      error: undefined,
    });

    render(<News />);

    expect(await screen.findByTestId('header')).toHaveTextContent(
      'Current news from the world of finance'
    );
    expect(await screen.findByTestId('subtitle')).toBeInTheDocument();
    expect(await screen.findByTestId('carousel')).toBeInTheDocument();

    await waitFor(() => {
      mockNewsData.forEach((news) => {
        expect(screen.getByText(news.title)).toBeInTheDocument();
      });
    });
  });

  test('Отображает ошибку при неудачном запросе', async () => {
    mockUseGetNews.mockReturnValue({
      data: mockNewsData,
      isLoading: false,
      error: new Error('Network Error'),
    });

    render(<News />);

    expect(await screen.findByTestId('errorHeader')).toHaveTextContent(
      'Current news from the world of finance'
    );
    expect(await screen.findByTestId('error')).toBeInTheDocument();
    expect(await screen.findByTestId('button')).toBeInTheDocument();
  });

  test('Отображает старые новости при клике на кнопку', async () => {
    mockUseGetNews.mockReturnValue({
      data: mockNewsData,
      isLoading: false,
      error: new Error('Network Error'),
    });
    render(<News />);

    fireEvent.click(await screen.findByTestId('button'));

    expect(await screen.findByTestId('carousel')).toBeInTheDocument();
  });
});
