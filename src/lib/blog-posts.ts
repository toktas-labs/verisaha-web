export type BlogLocale = "tr" | "en";

type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  locale: BlogLocale;
  title: string;
  excerpt: string;
  description: string;
  readTime: string;
  sections: BlogSection[];
};

const posts: BlogPost[] = [
  {
    id: "industrial-data-monitoring",
    slug: "endustriyel-veri-izlemenin-onemi",
    locale: "tr",
    title: "Endüstriyel Veri İzlemenin Önemi",
    excerpt:
      "Üretim süreçlerinde akış, sıcaklık, seviye ve basınç gibi parametrelerin sürekli izlenmesi, işletmelerin güvenliği ve verimliliği için kritik öneme sahiptir.",
    description:
      "Endüstriyel veri izlemenin üretim, bakım, kalite ve raporlama süreçlerine sağladığı temel faydaları inceleyin.",
    readTime: "4 dk okuma",
    sections: [
      {
        heading: "Neden sürekli veri izleme?",
        paragraphs: [
          "Endüstriyel tesislerde proses değerleri yalnızca anlık bir gösterge değildir. Akış, sıcaklık, seviye, basınç ve benzeri ölçümler; üretimin kararlı ilerleyip ilerlemediğini anlamak için birlikte değerlendirilir.",
          "Verilerin düzenli olarak kaydedilmesi, operatörün yalnızca o anı değil geçmiş davranışı da görmesini sağlar. Böylece normal çalışma aralıklarının dışına çıkan değişimler daha kolay fark edilir.",
        ],
      },
      {
        heading: "İşletmeye sağladığı katkılar",
        paragraphs: [
          "İyi tasarlanmış bir izleme sistemi, sahadaki ölçüm cihazlarından gelen bilgiyi tek bir noktada görünür hale getirir. Bu görünürlük bakım, üretim ve kalite ekiplerinin aynı veriye bakarak karar vermesini kolaylaştırır.",
        ],
        bullets: [
          "Anlık proses değerlerinin merkezi olarak izlenmesi",
          "Geçmiş kayıtların trend ve grafiklerle incelenmesi",
          "Beklenmeyen değişimlerin daha hızlı fark edilmesi",
          "Raporlama ve geriye dönük analiz için veri oluşturulması",
          "Sahaya gitmeden önce arızanın veya proses durumunun ön değerlendirilmesi",
        ],
      },
      {
        heading: "Doğru sistem nasıl kurulmalı?",
        paragraphs: [
          "Başarılı bir izleme projesi yalnızca yazılımdan ibaret değildir. Ölçüm cihazı, haberleşme altyapısı, veri toplama sıklığı, kayıt yöntemi ve kullanıcıların hangi bilgiye ihtiyaç duyduğu birlikte ele alınmalıdır.",
          "Modbus gibi endüstriyel protokoller sayesinde farklı cihazlardan alınan veriler ortak bir izleme altyapısında birleştirilebilir. Projeye başlamadan önce cihaz adresleri, register yapısı ve saha haberleşme koşullarının doğrulanması önemlidir.",
        ],
      },
    ],
  },
  {
    id: "flowmeter-types",
    slug: "debimetre-cesitleri-ve-uygulama-alanlari",
    locale: "tr",
    title: "Debimetre Çeşitleri ve Uygulama Alanları",
    excerpt:
      "Manyetik, ultrasonik ve Coriolis debimetreler hangi sektörlerde tercih edilir? Doğru seçim üretim hattınızda nasıl fark yaratır?",
    description:
      "Manyetik, ultrasonik ve Coriolis debimetrelerin temel çalışma alanlarını ve seçim sırasında dikkat edilmesi gereken noktaları inceleyin.",
    readTime: "5 dk okuma",
    sections: [
      {
        heading: "Debimetre seçiminde tek bir doğru yoktur",
        paragraphs: [
          "Debimetre seçimi; ölçülecek akışkanın özelliklerine, boru hattına, istenen doğruluğa, proses koşullarına ve bakım beklentilerine göre yapılır. Bu nedenle yalnızca debi aralığına bakarak cihaz seçmek çoğu uygulamada yeterli değildir.",
        ],
      },
      {
        heading: "Yaygın debimetre teknolojileri",
        paragraphs: [
          "Manyetik debimetreler iletken sıvıların ölçümünde sık kullanılır. Akış yolunda hareketli parça bulunmaması, birçok proses uygulamasında önemli bir avantaj sağlar.",
          "Ultrasonik debimetreler farklı montaj ve ölçüm prensiplerine sahip olabilir. Özellikle hatta müdahaleyi azaltmanın önemli olduğu uygulamalarda uygun çözümler sunabilir.",
          "Coriolis debimetreler doğrudan kütlesel debi ölçümü ve yoğunluk gibi ek proses bilgileri gerektiğinde öne çıkar. Uygunluk değerlendirmesinde proses şartları ve cihaz boyutlandırması birlikte ele alınmalıdır.",
        ],
      },
      {
        heading: "Seçim yaparken nelere bakılmalı?",
        paragraphs: [
          "Cihaz teknolojisinin yanında montaj şartları ve haberleşme seçenekleri de önemlidir. Ölçüm verisinin PLC, SCADA veya uzaktan izleme sistemine aktarılması planlanıyorsa cihazın desteklediği çıkışlar ve protokoller proje başında değerlendirilmelidir.",
        ],
        bullets: [
          "Akışkan tipi ve iletkenliği",
          "Debi aralığı ve proses basıncı/sıcaklığı",
          "Boru çapı ve montaj koşulları",
          "Beklenen ölçüm doğruluğu",
          "Analog, pulse veya Modbus gibi haberleşme ihtiyaçları",
          "Bakım ve kalibrasyon gereksinimleri",
        ],
      },
    ],
  },
  {
    id: "remote-monitoring-future",
    slug: "uzaktan-izleme-ve-otomasyonun-gelecegi",
    locale: "tr",
    title: "Uzaktan İzleme ve Otomasyonun Geleceği",
    excerpt:
      "IoT, bulut ve mobil çözümler sayesinde endüstriyel otomasyon gelecekte nasıl şekillenecek? İşletmeler için fırsatlar neler?",
    description:
      "Uzaktan izleme, endüstriyel haberleşme ve otomasyonun işletmeler için oluşturduğu yeni çalışma modellerine genel bakış.",
    readTime: "4 dk okuma",
    sections: [
      {
        heading: "Saha verisi artık yalnızca sahada kalmıyor",
        paragraphs: [
          "Endüstriyel tesislerde üretilen verinin güvenli biçimde merkezi sistemlere aktarılması, bakım ve operasyon ekiplerinin tesisten uzakta olsalar bile proses durumunu takip edebilmesini sağlar.",
          "Bu yaklaşım klasik PLC ve SCADA sistemlerinin yerini almak zorunda değildir. Çoğu projede amaç, mevcut otomasyon altyapısını güvenli veri toplama ve raporlama katmanlarıyla tamamlamaktır.",
        ],
      },
      {
        heading: "Uzaktan izlemenin öne çıkan kullanım alanları",
        paragraphs: [
          "Dağınık lokasyonlara sahip tesislerde merkezi görünürlük özellikle değerlidir. Kullanıcılar kritik ölçümleri, geçmiş trendleri ve raporları ortak bir arayüzden takip edebilir.",
        ],
        bullets: [
          "Uzak tesis ve ekipmanların merkezi takibi",
          "Mobil ve web arayüzlerinden proses görünürlüğü",
          "Otomatik raporlama ve geçmiş veri analizi",
          "Servis öncesi uzaktan teknik ön değerlendirme",
          "Farklı cihaz ve protokollerin ortak sisteme entegrasyonu",
        ],
      },
      {
        heading: "Güvenlik tasarımın bir parçası olmalı",
        paragraphs: [
          "Endüstriyel sistemleri internete açmak tek başına bir uzaktan izleme stratejisi değildir. Ağ segmentasyonu, erişim kontrolü, güvenli bağlantı yöntemleri ve yalnızca gerekli servislerin erişilebilir olması tasarımın temel parçalarıdır.",
          "Gelecekte daha fazla saha cihazı bağlantılı hale geldikçe, veri toplama kadar güvenli haberleşme ve sürdürülebilir bakım süreçleri de projelerin başarısını belirleyecektir.",
        ],
      },
    ],
  },
  {
    id: "industrial-data-monitoring",
    slug: "why-industrial-data-monitoring-matters",
    locale: "en",
    title: "Why Industrial Data Monitoring Matters",
    excerpt:
      "Continuous monitoring of flow, temperature, level, pressure and other process values is essential for visibility, safety and operational efficiency.",
    description:
      "Explore how industrial data monitoring supports production visibility, maintenance, quality and reporting workflows.",
    readTime: "4 min read",
    sections: [
      {
        heading: "Why monitor process data continuously?",
        paragraphs: [
          "Process values are more than instantaneous readings. Flow, temperature, level, pressure and similar measurements provide context about whether an industrial process is operating within its expected range.",
          "Recording these values over time allows teams to compare current conditions with historical behavior and identify unusual changes more easily.",
        ],
      },
      {
        heading: "Operational benefits",
        paragraphs: [
          "A well-designed monitoring system brings field measurements into a common view. This helps operations, maintenance and quality teams work from the same data instead of relying on isolated readings.",
        ],
        bullets: [
          "Central visibility of live process values",
          "Historical trends and graphical analysis",
          "Faster detection of unexpected process changes",
          "Structured data for reports and retrospective analysis",
          "Remote assessment before an on-site service visit",
        ],
      },
      {
        heading: "Building the right monitoring architecture",
        paragraphs: [
          "An effective monitoring project involves more than software. Field instruments, communications, polling intervals, data retention and user requirements should be considered together.",
          "Industrial protocols such as Modbus can help consolidate data from different devices. Device addresses, register maps and field communication conditions should be verified before commissioning.",
        ],
      },
    ],
  },
  {
    id: "flowmeter-types",
    slug: "flowmeter-types-and-applications",
    locale: "en",
    title: "Flowmeter Types and Application Areas",
    excerpt:
      "Where are magnetic, ultrasonic and Coriolis flowmeters commonly used, and what should be considered when selecting a meter?",
    description:
      "A practical overview of magnetic, ultrasonic and Coriolis flowmeters and the main factors involved in flowmeter selection.",
    readTime: "5 min read",
    sections: [
      {
        heading: "There is no single flowmeter for every process",
        paragraphs: [
          "Flowmeter selection depends on the fluid, pipework, required accuracy, process conditions and maintenance expectations. Selecting a device only by nominal flow range is rarely enough for an industrial application.",
        ],
      },
      {
        heading: "Common flow measurement technologies",
        paragraphs: [
          "Magnetic flowmeters are widely used for conductive liquids. Their unobstructed measuring tube and lack of moving parts can be advantageous in many process applications.",
          "Ultrasonic flowmeters are available with different measurement and installation approaches. They can be useful where reducing intervention in the pipework is an important requirement.",
          "Coriolis meters are particularly relevant when direct mass-flow measurement and additional process values such as density are required. Process conditions and meter sizing should be evaluated together.",
        ],
      },
      {
        heading: "What should be evaluated?",
        paragraphs: [
          "Communication requirements are important as well as the measurement principle. If flow data will be integrated into a PLC, SCADA or remote monitoring system, outputs and supported protocols should be defined early in the project.",
        ],
        bullets: [
          "Fluid type and conductivity",
          "Flow range, pressure and temperature",
          "Pipe diameter and installation conditions",
          "Required measurement accuracy",
          "Analog, pulse or Modbus communication requirements",
          "Maintenance and calibration expectations",
        ],
      },
    ],
  },
  {
    id: "remote-monitoring-future",
    slug: "future-of-remote-monitoring-and-automation",
    locale: "en",
    title: "The Future of Remote Monitoring and Automation",
    excerpt:
      "How are connected systems, web interfaces and secure data transfer changing the way industrial equipment is monitored?",
    description:
      "An overview of remote monitoring, industrial communications and the operational opportunities created by connected automation systems.",
    readTime: "4 min read",
    sections: [
      {
        heading: "Field data no longer has to remain on site",
        paragraphs: [
          "Securely transferring industrial data to a central system allows maintenance and operations teams to review process conditions even when they are away from the facility.",
          "This does not necessarily replace existing PLC or SCADA systems. In many projects, remote monitoring adds a secure data collection, visualization and reporting layer to the automation infrastructure already in place.",
        ],
      },
      {
        heading: "Where remote monitoring adds value",
        paragraphs: [
          "Central visibility becomes especially useful for organizations with distributed equipment or multiple sites. Critical measurements, trends and reports can be reviewed through a common interface.",
        ],
        bullets: [
          "Central monitoring of remote sites and equipment",
          "Process visibility through web and mobile interfaces",
          "Automated reporting and historical analysis",
          "Remote technical assessment before on-site service",
          "Integration of different field devices and protocols",
        ],
      },
      {
        heading: "Security must be part of the architecture",
        paragraphs: [
          "Simply exposing industrial equipment to the public internet is not a remote monitoring strategy. Network segmentation, access controls, secure connectivity and limiting exposed services should be considered from the beginning.",
          "As more field equipment becomes connected, secure communication and maintainable system architecture will be as important as the data collection itself.",
        ],
      },
    ],
  },
];

export function getBlogPosts(locale: BlogLocale): BlogPost[] {
  return posts.filter((post) => post.locale === locale);
}

export function getBlogPost(locale: BlogLocale, slug: string): BlogPost | undefined {
  return posts.find((post) => post.locale === locale && post.slug === slug);
}

export function getTranslatedBlogSlug(
  sourceLocale: BlogLocale,
  targetLocale: BlogLocale,
  slug: string
): string | undefined {
  const sourcePost = getBlogPost(sourceLocale, slug);
  if (!sourcePost) return undefined;

  return posts.find((post) => post.id === sourcePost.id && post.locale === targetLocale)?.slug;
}
