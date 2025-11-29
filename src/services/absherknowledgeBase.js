// قاعدة بيانات شاملة لخدمات أبشر
export const absherServices = {
traffic: {
name: ‘خدمات المرور’,
services: [
{
id: ‘traffic_violations’,
name: ‘الاستعلام عن المخالفات المرورية’,
description: ‘يمكنك الاستعلام عن المخالفات المرورية المسجلة على رخصة القيادة أو المركبة’,
steps: [
‘الدخول إلى منصة أبشر’,
‘اختيار خدمات المرور’,
‘اختيار الاستعلام عن المخالفات المرورية’,
‘إدخال رقم الهوية أو رقم لوحة المركبة’,
‘عرض تفاصيل المخالفات والمبالغ المستحقة’
],
requirements: [‘رقم الهوية الوطنية’, ‘أو رقم لوحة المركبة’],
url: ‘https://www.absher.sa’
},
{
id: ‘license_renewal’,
name: ‘تجديد رخصة القيادة’,
description: ‘تجديد رخصة القيادة إلكترونياً دون الحاجة لزيارة الإدارة’,
steps: [
‘الدخول إلى أبشر أفراد’,
‘اختيار خدمات المرور’,
‘اختيار تجديد رخصة القيادة’,
‘التحقق من البيانات’,
‘دفع الرسوم إلكترونياً’,
‘استلام الرخصة عبر البريد’
],
requirements: [
‘فحص طبي ساري المفعول’,
‘عدم وجود مخالفات معلقة’,
‘سداد رسوم التجديد’
],
fees: ‘200 ريال (لمدة 5 سنوات)’,
processingTime: ‘3-5 أيام عمل’
},
{
id: ‘vehicle_registration’,
name: ‘الاستعلام عن المركبة’,
description: ‘الاستعلام عن معلومات المركبة والاستمارة’,
steps: [
‘الدخول إلى أبشر’,
‘اختيار خدمات المرور’,
‘اختيار الاستعلام عن المركبة’,
‘إدخال رقم لوحة المركبة’,
‘عرض تفاصيل المركبة والاستمارة’
],
requirements: [‘رقم لوحة المركبة’],
info: ‘يمكنك معرفة تاريخ انتهاء الاستمارة والتأمين’
},
{
id: ‘accident_report’,
name: ‘بلاغ حادث مروري’,
description: ‘تسجيل بلاغ حادث مروري بسيط إلكترونياً’,
steps: [
‘الدخول إلى تطبيق أبشر أفراد’,
‘اختيار خدمات المرور’,
‘اختيار بلاغ حادث مروري’,
‘تحديد موقع الحادث’,
‘رفع صور الحادث’,
‘إدخال بيانات الطرف الآخر’,
‘إرسال البلاغ’
],
requirements: [‘وجود إصابات بسيطة أو بدون إصابات’, ‘تراضي الطرفين’],
note: ‘للحوادث الكبيرة يجب الاتصال بالمرور’
}
]
},

passport: {
name: ‘خدمات الجوازات’,
services: [
{
id: ‘passport_renewal’,
name: ‘تجديد جواز السفر’,
description: ‘تجديد جواز السفر إلكترونياً للمواطنين’,
steps: [
‘الدخول إلى أبشر أفراد’,
‘اختيار خدمات الجوازات’,
‘اختيار تجديد جواز السفر’,
‘رفع صورة شخصية حديثة’,
‘التحقق من البيانات’,
‘دفع الرسوم’,
‘استلام الجواز عبر البريد’
],
requirements: [
‘صورة شخصية بخلفية بيضاء’,
‘جواز السفر الحالي ساري أو منتهي’,
‘عدم وجود موانع أمنية’
],
fees: ‘300 ريال (لمدة 5 سنوات) أو 600 ريال (لمدة 10 سنوات)’,
processingTime: ‘3-7 أيام عمل’
},
{
id: ‘exit_reentry_visa’,
name: ‘تأشيرة خروج وعودة’,
description: ‘إصدار تأشيرة خروج وعودة للمقيمين’,
steps: [
‘الدخول إلى أبشر مقيم’,
‘اختيار خدمات الجوازات’,
‘اختيار إصدار تأشيرة خروج وعودة’,
‘تحديد نوع التأشيرة (لمرة واحدة أو متعددة)’,
‘تحديد مدة التأشيرة’,
‘دفع الرسوم’
],
requirements: [
‘إقامة سارية المفعول’,
‘جواز سفر ساري’,
‘عدم وجود موانع’
],
fees: ‘تختلف حسب نوع ومدة التأشيرة’,
types: [‘خروج وعودة لمرة واحدة’, ‘خروج وعودة متعددة’]
},
{
id: ‘final_exit_visa’,
name: ‘تأشيرة خروج نهائي’,
description: ‘إصدار تأشيرة خروج نهائي للمقيمين’,
steps: [
‘الدخول إلى أبشر مقيم’,
‘اختيار خدمات الجوازات’,
‘اختيار إصدار تأشيرة خروج نهائي’,
‘التحقق من عدم وجود التزامات مالية’,
‘دفع الرسوم’
],
requirements: [
‘إقامة سارية أو منتهية’,
‘عدم وجود التزامات مالية’,
‘تسوية المخالفات إن وجدت’
],
note: ‘بعد الخروج النهائي تلغى الإقامة نهائياً’
},
{
id: ‘travel_permit’,
name: ‘تصريح سفر’,
description: ‘إصدار تصريح سفر للأشخاص المشمولين’,
steps: [
‘الدخول إلى أبشر’,
‘اختيار خدمات الجوازات’,
‘اختيار إصدار تصريح سفر’,
‘تحديد المستفيد من التصريح’,
‘تحديد وجهة السفر ومدته’,
‘الموافقة والاعتماد’
],
requirements: [‘ولاية قانونية على المستفيد’, ‘جواز سفر ساري’],
beneficiaries: [‘الأبناء دون 21 سنة’, ‘الزوجة (إذا كان هناك طلب منع)’]
}
]
},

civil_affairs: {
name: ‘خدمات الأحوال المدنية’,
services: [
{
id: ‘id_inquiry’,
name: ‘الاستعلام عن الهوية الوطنية’,
description: ‘الاستعلام عن صلاحية وتفاصيل الهوية الوطنية’,
steps: [
‘الدخول إلى أبشر’,
‘اختيار خدمات الأحوال المدنية’,
‘اختيار الاستعلام عن الهوية’,
‘عرض تفاصيل الهوية وتاريخ الانتهاء’
],
requirements: [‘رقم الهوية الوطنية’],
info: ‘يمكنك معرفة تاريخ انتهاء الهوية ومكان إصدارها’
},
{
id: ‘id_renewal’,
name: ‘تجديد الهوية الوطنية’,
description: ‘تجديد الهوية الوطنية إلكترونياً’,
steps: [
‘الدخول إلى أبشر أفراد’,
‘اختيار خدمات الأحوال المدنية’,
‘اختيار تجديد الهوية الوطنية’,
‘رفع صورة شخصية’,
‘التحقق من البيانات’,
‘استلام الهوية عبر البريد’
],
requirements: [‘صورة شخصية حديثة’, ‘الهوية الحالية’],
fees: ‘مجاناً’,
processingTime: ‘5-7 أيام عمل’
},
{
id: ‘family_record’,
name: ‘الاستعلام عن سجل الأسرة’,
description: ‘عرض بيانات سجل الأسرة إلكترونياً’,
steps: [
‘الدخول إلى أبشر أفراد’,
‘اختيار خدمات الأحوال المدنية’,
‘اختيار سجل الأسرة’,
‘عرض بيانات أفراد الأسرة’
],
info: ‘يمكنك طباعة سجل الأسرة معتمد إلكترونياً’
},
{
id: ‘birth_certificate’,
name: ‘طباعة شهادة الميلاد’,
description: ‘طباعة شهادة ميلاد معتمدة إلكترونياً’,
steps: [
‘الدخول إلى أبشر’,
‘اختيار خدمات الأحوال المدنية’,
‘اختيار طباعة شهادة الميلاد’,
‘تحديد المستفيد’,
‘طباعة الشهادة’
],
note: ‘الشهادة معتمدة إلكترونياً ولا تحتاج ختم’
}
]
},

general: {
name: ‘خدمات عامة’,
services: [
{
id: ‘absher_account’,
name: ‘إنشاء حساب في أبشر’,
description: ‘كيفية إنشاء حساب جديد في منصة أبشر’,
steps: [
‘زيارة موقع أبشر الإلكتروني’,
‘اختيار مستخدم جديد’,
‘إدخال رقم الهوية’,
‘إدخال رقم الجوال’,
‘استلام رمز التحقق’,
‘إنشاء كلمة مرور’,
‘تفعيل الحساب’
],
requirements: [‘رقم الهوية الوطنية’, ‘رقم جوال مسجل باسمك’],
url: ‘https://www.absher.sa/register’
},
{
id: ‘forgot_password’,
name: ‘استعادة كلمة المرور’,
description: ‘استعادة الدخول إلى حساب أبشر’,
steps: [
‘الضغط على نسيت كلمة المرور’,
‘إدخال رقم الهوية’,
‘إدخال رقم الجوال المسجل’,
‘استلام رمز التحقق’,
‘إنشاء كلمة مرور جديدة’
]
},
{
id: ‘mobile_app’,
name: ‘تطبيق أبشر للجوال’,
description: ‘تحميل واستخدام تطبيق أبشر على الجوال’,
platforms: [‘iOS - App Store’, ‘Android - Google Play’],
features: [
‘الوصول لجميع الخدمات’,
‘الإشعارات الفورية’,
‘سهولة الاستخدام’,
‘الوصول السريع للوثائق’
]
}
]
}
};

// دالة البحث في قاعدة البيانات
export const searchAbsherServices = (query) => {
const results = [];
const lowerQuery = query.toLowerCase();

Object.values(absherServices).forEach(category => {
category.services.forEach(service => {
if (
service.name.includes(query) ||
service.description.includes(query) ||
service.name.toLowerCase().includes(lowerQuery) ||
service.description.toLowerCase().includes(lowerQuery)
) {
results.push({
category: category.name,
service: service
});
}
});
});

return results;
};

// الكلمات المفتاحية لكل خدمة
export const serviceKeywords = {
‘مخالفات’: [‘traffic_violations’],
‘رخصة’: [‘license_renewal’],
‘قيادة’: [‘license_renewal’],
‘جواز’: [‘passport_renewal’],
‘سفر’: [‘passport_renewal’, ‘exit_reentry_visa’, ‘travel_permit’],
‘خروج’: [‘exit_reentry_visa’, ‘final_exit_visa’],
‘عودة’: [‘exit_reentry_visa’],
‘هوية’: [‘id_inquiry’, ‘id_renewal’],
‘أحوال’: [‘id_inquiry’, ‘family_record’],
‘سجل’: [‘family_record’],
‘أسرة’: [‘family_record’],
‘ميلاد’: [‘birth_certificate’],
‘حساب’: [‘absher_account’],
‘كلمة المرور’: [‘forgot_password’],
‘مرور’: [‘password_recovery’, ‘traffic_violations’],
‘استمارة’: [‘vehicle_registration’],
‘مركبة’: [‘vehicle_registration’],
‘حادث’: [‘accident_report’],
‘تأمين’: [‘vehicle_registration’]
};

// دالة للحصول على خدمة معينة
export const getServiceById = (serviceId) => {
for (const category of Object.values(absherServices)) {
const service = category.services.find(s => s.id === serviceId);
if (service) {
return {
category: category.name,
service: service
};
}
}
return null;
};

// دالة للحصول على جميع الخدمات في فئة
export const getServicesByCategory = (categoryKey) => {
return absherServices[categoryKey] || null;
};

// إحصائيات عن أبشر
export const absherStats = {
totalUsers: ‘أكثر من 22 مليون مستخدم’,
totalServices: ‘أكثر من 200 خدمة إلكترونية’,
availability: ‘24/7’,
platforms: [‘موقع إلكتروني’, ‘تطبيق iOS’, ‘تطبيق Android’],
languages: [‘العربية’, ‘الإنجليزية’]
};

// روابط مهمة
export const importantLinks = {
main: ‘https://www.absher.sa’,
individuals: ‘https://www.absher.sa/individuals’,
businesses: ‘https://www.absher.sa/businesses’,
support: ‘https://www.absher.sa/support’,
twitter: ‘https://twitter.com/absher’,
helpNumber: ‘920002992’
};

export default absherServices
