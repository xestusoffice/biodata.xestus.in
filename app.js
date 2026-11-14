/* XESTUS Marriage Biodata Engine */

const sampleDemoBio = {
  headerBlessing: "|| ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ||",
  titleText: "MARRIAGE BIO-DATA",
  photo: "",
  name: "পাত্র / পাত্রীর নাম (Sample Name)",
  dob: "01/01/1998",
  tob: "10:30 AM",
  pob: "Kolkata, West Bengal",
  height: "5 ft 8 in",
  complexion: "Fair",
  bloodGroup: "O+",
  motherTongue: "Bengali",
  caste: "General / Brahmin / Kayastha",
  rashi: "Tula / Leo",
  qualification: "Master's / Bachelor's Degree",
  university: "University / Institute Name",
  occupation: "Job Title / Profession",
  companyName: "Company / Organization Name",
  income: "₹ Annual / Monthly Income",
  fatherName: "পিতার নাম ও পেশা",
  motherName: "মাতার নাম ও পেশা",
  brother: "ভাইয়ের বিবরণ (থাকলে)",
  sister: "বোনের বিবরণ (থাকলে)",
  nativePlace: "আবাসিক জেলা ও স্থান",
  familyType: "Nuclear / Joint Family",
  contactPerson: "অভিভাবকের নাম",
  phone: "+91 98765 XXXXX",
  whatsapp: "+91 98765 XXXXX",
  email: "contact@example.com",
  address: "সম্পূর্ণ ঠিকানা, জেলা, পিন কোড"
};

const emptyInitialBio = {
  headerBlessing: "|| ওঁ শ্রী শ্রী প্রজাপতয়ে নমঃ ||",
  titleText: "MARRIAGE BIO-DATA",
  photo: "",
  name: "",
  dob: "",
  tob: "",
  pob: "",
  height: "",
  complexion: "",
  bloodGroup: "",
  motherTongue: "Bengali",
  caste: "",
  rashi: "",
  qualification: "",
  university: "",
  occupation: "",
  companyName: "",
  income: "",
  fatherName: "",
  motherName: "",
  brother: "",
  sister: "",
  nativePlace: "",
  familyType: "",
  contactPerson: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: ""
};

let currentBio = JSON.parse(localStorage.getItem('xestus_biodata_info')) || JSON.parse(JSON.stringify(emptyInitialBio));
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
  const fields = ['titleText', 'name', 'dob', 'tob', 'pob', 'height', 'complexion', 'bloodGroup', 'motherTongue', 'caste', 'rashi', 'qualification', 'university', 'occupation', 'companyName', 'income', 'fatherName', 'motherName', 'brother', 'sister', 'nativePlace', 'familyType', 'contactPerson', 'phone', 'whatsapp', 'email', 'address'];
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

  const displayName = currentBio.name || '[পাত্র / পাত্রীর পূর্ণ নাম]';
  const displayOcc = currentBio.occupation || '[পেশা / চাকরি]';
  const displayEdu = currentBio.qualification || '[শিক্ষাগত যোগ্যতা]';
  const isNameEmpty = !currentBio.name;

  const photoHtml = currentBio.photo 
    ? `<img src="${currentBio.photo}" class="biodata-photo" alt="${displayName}">`
    : '<div style="width: 100px; height: 120px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #94a3b8; text-align: center; padding: 6px;">ছবি যোগ করুন (ঐচ্ছিক)</div>';

  biodataPaper.innerHTML = `
    <header class="biodata-header">
      <div class="blessing-text">${currentBio.headerBlessing}</div>
      <h1 class="main-title">${currentBio.titleText || 'MARRIAGE BIO-DATA'}</h1>
    </header>

    <div class="biodata-body">
      
      <div class="profile-banner">
        <div style="flex: 1;">
          <h2 style="font-size: 20px; font-weight: 800; ${isNameEmpty ? 'color: #94a3b8;' : 'color: #1e293b;'}">${displayName}</h2>
          <div style="font-size: 13.5px; color: #64748b; font-weight: 600; margin-top: 3px;">
            ${displayOcc} • ${displayEdu}
          </div>
        </div>
        ${photoHtml}
      </div>

      <!-- Personal Info -->
      <div>
        <div class="section-title"><i class="fa-solid fa-user"></i> ব্যক্তিগত তথ্য (Personal Details)</div>
        <table class="detail-table">
          <tr><td class="label-col">নাম (Full Name)</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.name || '<span style="color:#94a3b8;">[নাম লিখুন]</span>'}</strong></td></tr>
          <tr><td class="label-col">জন্ম তারিখ (Date of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.dob || '<span style="color:#94a3b8;">[জন্ম তারিখ লিখুন]</span>'}</td></tr>
          ${currentBio.tob ? `<tr><td class="label-col">জন্ম সময় (Time of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.tob}</td></tr>` : ''}
          ${currentBio.pob ? `<tr><td class="label-col">জন্ম স্থান (Place of Birth)</td><td class="colon-col">:</td><td class="value-col">${currentBio.pob}</td></tr>` : ''}
          <tr><td class="label-col">উচ্চতা (Height)</td><td class="colon-col">:</td><td class="value-col">${currentBio.height || '<span style="color:#94a3b8;">[উচ্চতা লিখুন]</span>'}</td></tr>
          <tr><td class="label-col">বর্ণ (Complexion)</td><td class="colon-col">:</td><td class="value-col">${currentBio.complexion || '<span style="color:#94a3b8;">[গায়ের বর্ণ]</span>'}</td></tr>
          <tr><td class="label-col">রক্তের গ্রুপ (Blood Group)</td><td class="colon-col">:</td><td class="value-col">${currentBio.bloodGroup || '<span style="color:#94a3b8;">[রক্তের গ্রুপ]</span>'}</td></tr>
          <tr><td class="label-col">মাতৃভাষা (Mother Tongue)</td><td class="colon-col">:</td><td class="value-col">${currentBio.motherTongue || 'বাংলা'}</td></tr>
          ${currentBio.caste ? `<tr><td class="label-col">বর্ণ ও গোত্র (Caste & Gotra)</td><td class="colon-col">:</td><td class="value-col">${currentBio.caste}</td></tr>` : ''}
          ${currentBio.rashi ? `<tr><td class="label-col">রাশি (Zodiac / Rashi)</td><td class="colon-col">:</td><td class="value-col">${currentBio.rashi}</td></tr>` : ''}
        </table>
      </div>

      <!-- Education & Career -->
      <div>
        <div class="section-title"><i class="fa-solid fa-graduation-cap"></i> শিক্ষা ও পেশাগত তথ্য (Education & Career)</div>
        <table class="detail-table">
          <tr><td class="label-col">শিক্ষাগত যোগ্যতা</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.qualification || '<span style="color:#94a3b8;">[ডিগ্রি বা শিক্ষাগত যোগ্যতা]</span>'}</strong></td></tr>
          <tr><td class="label-col">কলেজ / বিশ্ববিদ্যালয়</td><td class="colon-col">:</td><td class="value-col">${currentBio.university || '<span style="color:#94a3b8;">[কলেজ বা বোর্ডের নাম]</span>'}</td></tr>
          <tr><td class="label-col">বর্তমান পেশা (Profession)</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.occupation || '<span style="color:#94a3b8;">[পেশা বা কাজের বিবরণ]</span>'}</strong></td></tr>
          ${currentBio.companyName ? `<tr><td class="label-col">প্রতিষ্ঠানের নাম</td><td class="colon-col">:</td><td class="value-col">${currentBio.companyName}</td></tr>` : ''}
          ${currentBio.income ? `<tr><td class="label-col">বাৎসরিক আয় (Income)</td><td class="colon-col">:</td><td class="value-col">${currentBio.income}</td></tr>` : ''}
        </table>
      </div>

      <!-- Family Details -->
      <div>
        <div class="section-title"><i class="fa-solid fa-people-roof"></i> পারিবারিক বিবরণ (Family Details)</div>
        <table class="detail-table">
          <tr><td class="label-col">পিতার নাম ও পেশা</td><td class="colon-col">:</td><td class="value-col">${currentBio.fatherName || '<span style="color:#94a3b8;">[পিতার নাম ও পেশা]</span>'}</td></tr>
          <tr><td class="label-col">মাতার নাম ও পেশা</td><td class="colon-col">:</td><td class="value-col">${currentBio.motherName || '<span style="color:#94a3b8;">[মাতার নাম ও পেশা]</span>'}</td></tr>
          ${currentBio.brother ? `<tr><td class="label-col">ভাই (Brothers)</td><td class="colon-col">:</td><td class="value-col">${currentBio.brother}</td></tr>` : ''}
          ${currentBio.sister ? `<tr><td class="label-col">বোন (Sisters)</td><td class="colon-col">:</td><td class="value-col">${currentBio.sister}</td></tr>` : ''}
          <tr><td class="label-col">আদি বাসস্থান (Native)</td><td class="colon-col">:</td><td class="value-col">${currentBio.nativePlace || '<span style="color:#94a3b8;">[জেলা বা এলাকার নাম]</span>'}</td></tr>
          ${currentBio.familyType ? `<tr><td class="label-col">পারিবারিক ধরন</td><td class="colon-col">:</td><td class="value-col">${currentBio.familyType}</td></tr>` : ''}
        </table>
      </div>

      <!-- Contact Info -->
      <div>
        <div class="section-title"><i class="fa-solid fa-address-book"></i> যোগাযোগের ঠিকানা (Contact Information)</div>
        <table class="detail-table">
          <tr><td class="label-col">যোগাযোগের ব্যক্তি</td><td class="colon-col">:</td><td class="value-col">${currentBio.contactPerson || '<span style="color:#94a3b8;">[অভিভাবকের নাম]</span>'}</td></tr>
          <tr><td class="label-col">ফোন নম্বর</td><td class="colon-col">:</td><td class="value-col"><strong>${currentBio.phone || '<span style="color:#94a3b8;">[মোবাইল নম্বর]</span>'}</strong></td></tr>
          ${currentBio.whatsapp ? `<tr><td class="label-col">হোয়াটসঅ্যাপ নম্বর</td><td class="colon-col">:</td><td class="value-col">${currentBio.whatsapp}</td></tr>` : ''}
          ${currentBio.email ? `<tr><td class="label-col">ইমেইল</td><td class="colon-col">:</td><td class="value-col">${currentBio.email}</td></tr>` : ''}
          <tr><td class="label-col">স্থায়ী ঠিকানা</td><td class="colon-col">:</td><td class="value-col">${currentBio.address || '<span style="color:#94a3b8;">[ঠিকানা লিখুন]</span>'}</td></tr>
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
    if (confirm('নমুনা ডেমো তথ্য দেখতে চান? আপনার বর্তমান ইনপুট প্রতিস্থাপিত হবে।')) {
      currentBio = JSON.parse(JSON.stringify(sampleDemoBio));
      saveBio();
      populateFields();
      renderPreview();
    }
  });
}

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    if (confirm('সব ঘর ফাঁকা করতে চান?')) {
      currentBio = JSON.parse(JSON.stringify(emptyInitialBio));
      saveBio();
      populateFields();
      renderPreview();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
