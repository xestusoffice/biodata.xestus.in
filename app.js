/* XESTUS Marriage Biodata Engine */

const defaultBioData = {
  headerBlessing: "|| ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ||",
  titleText: "MARRIAGE BIO-DATA",
  photo: "",
  name: "সুব্রত মুখার্জী (Subrata Mukherjee)",
  dob: "12th August 1996",
  tob: "08:15 AM",
  pob: "Kolkata, West Bengal",
  height: "5 ft 9 in (175 cm)",
  complexion: "Fair",
  bloodGroup: "B+ Positive",
  motherTongue: "Bengali",
  caste: "Brahmin (Sandilya Gotra)",
  rashi: "Tula (Libra)",
  qualification: "B.Tech in Computer Science & Engineering",
  university: "Jadavpur University, Kolkata",
  occupation: "Senior Software Specialist",
  companyName: "Reputed IT MNC, Salt Lake Sector V",
  income: "₹14.5 Lakhs Per Annum",
  fatherName: "অশোক মুখার্জী (Retd. Central Govt. Officer)",
  motherName: "প্রতিমা মুখার্জী (Home Maker)",
  brother: "1 Elder Brother (Married, Banking Professional)",
  sister: "None",
  nativePlace: "Behala, South Kolkata",
  familyType: "Nuclear Family (Cultured & Liberal Values)",
  contactPerson: "Ashok Mukherjee (Father)",
  phone: "+91 98301 23456 / +91 94330 98765",
  whatsapp: "+91 98301 23456",
  email: "ashok.mukherjee1960@example.com",
  address: "Flat 3B, Anandam Heights, Diamond Harbour Road, Behala, Kolkata - 700034"
};

let currentBio = JSON.parse(localStorage.getItem('xestus_biodata_info')) || JSON.parse(JSON.stringify(defaultBioData));
let currentTheme = localStorage.getItem('xestus_biodata_theme') || 'theme-royal';

const biodataPaper = document.getElementById('biodataPaper');
const themeSelect = document.getElementById('themeSelect');
const blessingSelect = document.getElementById('blessingSelect');
const printBtn = document.getElementById('printBtn');
const loadSampleBtn = document.getElementById('loadSampleBtn');
const clearBtn = document.getElementById('clearBtn');

function init() {
  if (themeSelect) themeSelect.value = currentTheme;
  if (blessingSelect) blessingSelect.value = currentBio.headerBlessing || "|| ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ||";
  populateFields();
  renderPreview();
  bindEvents();
}

function populateFields() {
  const fields = ['headerBlessing', 'titleText', 'name', 'dob', 'tob', 'pob', 'height', 'complexion', 'bloodGroup', 'motherTongue', 'caste', 'rashi', 'qualification', 'university', 'occupation', 'companyName', 'income', 'fatherName', 'motherName', 'brother', 'sister', 'nativePlace', 'familyType', 'contactPerson', 'phone', 'whatsapp', 'email', 'address'];
  fields.forEach(f => {
    const el = document.getElementById('bio_' + f);
    if (el) el.value = currentBio[f] || '';
  });
}

function bindEvents() {
  const fields = ['titleText', 'name', 'dob', 'tob', 'pob', 'height', 'complexion', 'bloodGroup', 'motherTongue', 'caste', 'rashi', 'qualification', 'university', 'occupation', 'companyName', 'income', 'fatherName', 'motherName', 'brother', 'sister', 'nativePlace', 'familyType', 'contactPerson', 'phone', 'whatsapp', 'email', 'address'];
  fields.forEach(f => {
    const el = document.getElementById('bio_' + f);
    if (el) {
      el.addEventListener('input', (e) => {
        currentBio[f] = e.target.value;
        saveBio();
        renderPreview();
      });
    }
  });

  if (blessingSelect) {
    blessingSelect.addEventListener('change', (e) => {
      currentBio.headerBlessing = e.target.value;
      saveBio();
      renderPreview();
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      currentTheme = e.target.value;
      localStorage.setItem('xestus_biodata_theme', currentTheme);
      renderPreview();
    });
  }

  const photoInput = document.getElementById('bio_photo');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentBio.photo = event.target.result;
          saveBio();
          renderPreview();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function saveBio() {
  localStorage.setItem('xestus_biodata_info', JSON.stringify(currentBio));
}

function renderPreview() {
  biodataPaper.className = `biodata-paper ${currentTheme}`;

  const photoHtml = currentBio.photo 
    ? `<img src="${currentBio.photo}" class="biodata-photo" alt="${currentBio.name}">`
    : '';

  biodataPaper.innerHTML = `
    <header class="biodata-header">
      <div class="blessing-text">${currentBio.headerBlessing}</div>
      <h1 class="main-title">${currentBio.titleText || 'MARRIAGE BIO-DATA'}</h1>
    </header>

    <div class="biodata-body">
      
      <div class="profile-banner">
        <div style="flex: 1;">
          <h2 style="font-size: 20px; font-weight: 800; color: #1e293b;">${currentBio.name}</h2>
          <div style="font-size: 13.5px; color: #64748b; font-weight: 600; margin-top: 3px;">
            ${currentBio.occupation} | ${currentBio.qualification}
          </div>
        </div>
        ${photoHtml}
      </div>

      <!-- Personal Info -->
      <div>
        <div class="section-title"><i class="fa-solid fa-user"></i> ব্যক্তিগত তথ্য (Personal Details)</div>
        <table class="detail-table">
          <tr><td class="label-col">নাম (Full Name)</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.name}</strong></td></tr>
          <tr><td class="label-col">জন্ম তারিখ (Date of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.dob}</td></tr>
          ${currentBio.tob ? `<tr><td class="label-col">জন্ম সময় (Time of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.tob}</td></tr>` : ''}
          ${currentBio.pob ? `<tr><td class="label-col">জন্ম স্থান (Place of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.pob}</td></tr>` : ''}
          <tr><td class="label-col">উচ্চতা (Height)</td><td class="colon-col">:</td><td class="value-col">${currentBio.height}</td></tr>
          <tr><td class="label-col">বর্ণ (Complexion)</td><td class="colon-col">:</td><td class="value-col">${currentBio.complexion}</td></tr>
          <tr><td class="label-col">রক্তের গ্রুপ (Blood Group)</td><td class="colon-col">:</td><td class="value-col">${currentBio.bloodGroup}</td></tr>
          <tr><td class="label-col">মাতৃভাষা (Mother Tongue)</td><td class="colon-col">:</td><td class="value-col">${currentBio.motherTongue}</td></tr>
          ${currentBio.caste ? `<tr><td class="label-col">বর্ণ / গোত্র (Caste & Gotra)</td><td class="colon-col">:</td><td class="value-col">${currentBio.caste}</td></tr>` : ''}
          ${currentBio.rashi ? `<tr><td class="label-col">রাশি (Zodiac / Rashi)</td><td class="colon-col">:</td><td class="value-col">${currentBio.rashi}</td></tr>` : ''}
        </table>
      </div>

      <!-- Education & Career -->
      <div>
        <div class="section-title"><i class="fa-solid fa-graduation-cap"></i> শিক্ষা ও পেশাগত তথ্য (Education & Career)</div>
        <table class="detail-table">
          <tr><td class="label-col">শিক্ষাগত যোগ্যতা</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.qualification}</strong></td></tr>
          <tr><td class="label-col">কলেজ / বিশ্ববিদ্যালয়</td><td class="colon-col">:</td><td class="value-col">${currentBio.university}</td></tr>
          <tr><td class="label-col">বর্তমান পেশা (Profession)</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.occupation}</strong></td></tr>
          <tr><td class="label-col">প্রতিষ্ঠানের নাম</td><td class="colon-col">:</td><td class="value-col">${currentBio.companyName}</td></tr>
          <tr><td class="label-col">বাৎসরিক আয় (Income)</td><td class="colon-col">:</td><td class="value-col">${currentBio.income}</td></tr>
        </table>
      </div>

      <!-- Family Details -->
      <div>
        <div class="section-title"><i class="fa-solid fa-people-roof"></i> পারিবারিক বিবরণ (Family Details)</div>
        <table class="detail-table">
          <tr><td class="label-col">পিতার নাম ও পেশা</td><td class="colon-col">:</td><td class="value-col">${currentBio.fatherName}</td></tr>
          <tr><td class="label-col">মাতার নাম ও পেশা</td><td class="colon-col">:</td><td class="value-col">${currentBio.motherName}</td></tr>
          <tr><td class="label-col">ভাই (Brothers)</td><td class="colon-col">:</td><td class="value-col">${currentBio.brother}</td></tr>
          <tr><td class="label-col">বোন (Sisters)</td><td class="colon-col">:</td><td class="value-col">${currentBio.sister}</td></tr>
          <tr><td class="label-col">আদি বাসস্থান (Native)</td><td class="colon-col">:</td><td class="value-col">${currentBio.nativePlace}</td></tr>
          <tr><td class="label-col">পারিবারিক ধরন</td><td class="colon-col">:</td><td class="value-col">${currentBio.familyType}</td></tr>
        </table>
      </div>

      <!-- Contact Info -->
      <div>
        <div class="section-title"><i class="fa-solid fa-address-book"></i> যোগাযোগের ঠিকানা (Contact Information)</div>
        <table class="detail-table">
          <tr><td class="label-col">যোগাযোগের ব্যক্তি</td><td class="colon-col">:</td><td class="value-col">${currentBio.contactPerson}</td></tr>
          <tr><td class="label-col">ফোন নম্বর</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.phone}</strong></td></tr>
          ${currentBio.whatsapp ? `<tr><td class="label-col">হোয়াটসঅ্যাপ নম্বর</td><td class="colon-col">:</td><td class="value-col">${currentBio.whatsapp}</td></tr>` : ''}
          ${currentBio.email ? `<tr><td class="label-col">ইমেইল</td><td class="colon-col">:</td><td class="value-col">${currentBio.email}</td></tr>` : ''}
          <tr><td class="label-col">স্থায়ী ঠিকানা</td><td class="colon-col">:</td><td class="value-col">${currentBio.address}</td></tr>
        </table>
      </div>

    </div>
  `;
}

if (printBtn) {
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

if (loadSampleBtn) {
  loadSampleBtn.addEventListener('click', () => {
    if (confirm('নমুনা তথ্য লোড করবেন? বর্তমান তথ্য মুছে যাবে।')) {
      currentBio = JSON.parse(JSON.stringify(defaultBioData));
      saveBio();
      populateFields();
      renderPreview();
    }
  });
}

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('সব ঘর ফাঁকা করতে চান?')) {
      currentBio = {
        headerBlessing: "|| ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ||",
        titleText: "MARRIAGE BIO-DATA",
        photo: "", name: "", dob: "", tob: "", pob: "", height: "",
        complexion: "", bloodGroup: "", motherTongue: "", caste: "",
        rashi: "", qualification: "", university: "", occupation: "",
        companyName: "", income: "", fatherName: "", motherName: "",
        brother: "", sister: "", nativePlace: "", familyType: "",
        contactPerson: "", phone: "", whatsapp: "", email: "", address: ""
      };
      saveBio();
      populateFields();
      renderPreview();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
