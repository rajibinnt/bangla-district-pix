export interface District {
  id: string;
  name: string;
  bangla: string;
  x: number; // percentage of viewBox width
  y: number; // percentage of viewBox height
  division: string;
  images: string[];
}

// Coordinates derived from SVG text positions (viewBox: 0 0 1655.4 2224.5)
const VB_W = 1655.4;
const VB_H = 2224.5;

const raw: Array<{ name: string; bangla: string; x: number; y: number; division: string }> = [
  { name: "Dhaka", bangla: "ঢাকা", x: 792, y: 1066, division: "Dhaka" },
  { name: "Comilla", bangla: "কুমিল্লা", x: 1042, y: 1205, division: "Chittagong" },
  { name: "Munshiganj", bangla: "মুন্সিগঞ্জ", x: 793, y: 1159, division: "Dhaka" },
  { name: "Mymensingh", bangla: "ময়মনসিংহ", x: 816, y: 760, division: "Mymensingh" },
  { name: "Sylhet", bangla: "সিলেট", x: 1346, y: 669, division: "Sylhet" },
  { name: "Khagrachari", bangla: "খাগড়াছড়ি", x: 1320, y: 1275, division: "Chittagong" },
  { name: "Bhola", bangla: "ভোলা", x: 936, y: 1535, division: "Barisal" },
  { name: "Borguna", bangla: "বরগুনা", x: 715, y: 1646, division: "Barisal" },
  { name: "Satkhira", bangla: "সাতক্ষীরা", x: 383, y: 1435, division: "Khulna" },
  { name: "Gopalganj", bangla: "গোপালগঞ্জ", x: 633, y: 1318, division: "Dhaka" },
  { name: "Magura", bangla: "মাগুরা", x: 484, y: 1189, division: "Khulna" },
  { name: "Chuadanga", bangla: "চুয়াডাঙ্গা", x: 280, y: 1127, division: "Khulna" },
  { name: "Pabna", bangla: "পাবনা", x: 486, y: 969, division: "Rajshahi" },
  { name: "Rajshahi", bangla: "রাজশাহী", x: 217, y: 807, division: "Rajshahi" },
  { name: "Gaibandha", bangla: "গাইবান্ধা", x: 505, y: 529, division: "Rangpur" },
  { name: "Lalmonirhat", bangla: "লালমনিরহাট", x: 431, y: 280, division: "Rangpur" },
  { name: "Rangamati", bangla: "রাঙামাটি", x: 1417, y: 1443, division: "Chittagong" },
  { name: "Cox's Bazar", bangla: "কক্সবাজার", x: 1337, y: 1771, division: "Chittagong" },
  { name: "Noakhali", bangla: "নোয়াখালী", x: 1043, y: 1380, division: "Chittagong" },
  { name: "Chandpur", bangla: "চাঁদপুর", x: 940, y: 1243, division: "Chittagong" },
  { name: "Patuakhali", bangla: "পটুয়াখালী", x: 817, y: 1563, division: "Barisal" },
  { name: "Khulna", bangla: "খুলনা", x: 494, y: 1527, division: "Khulna" },
  { name: "Pirojpur", bangla: "পিরোজপুর", x: 692, y: 1434, division: "Barisal" },
  { name: "Madaripur", bangla: "মাদারীপুর", x: 712, y: 1277, division: "Dhaka" },
  { name: "Jhenaidah", bangla: "ঝিনাইদহ", x: 389, y: 1159, division: "Khulna" },
  { name: "Meherpur", bangla: "মেহেরপুর", x: 244, y: 1069, division: "Khulna" },
  { name: "Manikganj", bangla: "মানিকগঞ্জ", x: 663, y: 1041, division: "Dhaka" },
  { name: "Gazipur", bangla: "গাজীপুর", x: 835, y: 946, division: "Dhaka" },
  { name: "Brahmanbaria", bangla: "ব্রাহ্মণবাড়িয়া", x: 995, y: 1042, division: "Chittagong" },
  { name: "Natore", bangla: "নাটোর", x: 387, y: 844, division: "Rajshahi" },
  { name: "Sunamganj", bangla: "সুনামগঞ্জ", x: 1149, y: 663, division: "Sylhet" },
  { name: "Jamalpur", bangla: "জামালপুর", x: 629, y: 680, division: "Mymensingh" },
  { name: "Joypurhat", bangla: "জয়পুরহাট", x: 379, y: 596, division: "Rajshahi" },
  { name: "Nilphamari", bangla: "নীলফামারী", x: 326, y: 286, division: "Rangpur" },
  { name: "Thakurgaon", bangla: "ঠাকুরগাঁও", x: 109, y: 283, division: "Rangpur" },
  { name: "Habiganj", bangla: "হবিগঞ্জ", x: 1155, y: 856, division: "Sylhet" },
  { name: "Panchagarh", bangla: "পঞ্চগড়", x: 189, y: 166, division: "Rangpur" },
  { name: "Netrokona", bangla: "নেত্রকোনা", x: 947, y: 674, division: "Mymensingh" },
  { name: "Tangail", bangla: "টাঙ্গাইল", x: 684, y: 849, division: "Dhaka" },
  { name: "Chittagong", bangla: "চট্টগ্রাম", x: 1290, y: 1572, division: "Chittagong" },
  { name: "Barisal", bangla: "বরিশাল", x: 824, y: 1394, division: "Barisal" },
  { name: "Narail", bangla: "নড়াইল", x: 549, y: 1292, division: "Khulna" },
  { name: "Narsingdi", bangla: "নরসিংদী", x: 938, y: 983, division: "Dhaka" },
  { name: "Rajbari", bangla: "রাজবাড়ী", x: 532, y: 1083, division: "Dhaka" },
  { name: "Nawabganj", bangla: "নবাবগঞ্জ", x: 87, y: 729, division: "Rajshahi" },
  { name: "Bogra", bangla: "বগুড়া", x: 489, y: 683, division: "Rajshahi" },
  { name: "Dinajpur", bangla: "দিনাজপুর", x: 252, y: 394, division: "Rangpur" },
  { name: "Kurigram", bangla: "কুড়িগ্রাম", x: 564, y: 369, division: "Rangpur" },
  { name: "Moulvibazar", bangla: "মৌলভীবাজার", x: 1291, y: 810, division: "Sylhet" },
  { name: "Bandarban", bangla: "বান্দরবান", x: 1468, y: 1736, division: "Chittagong" },
  { name: "Feni", bangla: "ফেনী", x: 1155, y: 1342, division: "Chittagong" },
  { name: "Lakshmipur", bangla: "লক্ষ্মীপুর", x: 942, y: 1353, division: "Chittagong" },
  { name: "Jhalokati", bangla: "ঝালকাঠি", x: 757, y: 1468, division: "Barisal" },
  { name: "Bagerhat", bangla: "বাগেরহাট", x: 591, y: 1489, division: "Khulna" },
  { name: "Jessore", bangla: "যশোর", x: 413, y: 1291, division: "Khulna" },
  { name: "Kushtia", bangla: "কুষ্টিয়া", x: 368, y: 1020, division: "Khulna" },
  { name: "Shariatpur", bangla: "শরীয়তপুর", x: 797, y: 1257, division: "Dhaka" },
  { name: "Faridpur", bangla: "ফরিদপুর", x: 635, y: 1169, division: "Dhaka" },
  { name: "Narayanganj", bangla: "নারায়ণগঞ্জ", x: 859, y: 1063, division: "Dhaka" },
  { name: "Kishoreganj", bangla: "কিশোরগঞ্জ", x: 988, y: 845, division: "Dhaka" },
  { name: "Sirajganj", bangla: "সিরাজগঞ্জ", x: 525, y: 845, division: "Rajshahi" },
  { name: "Naogaon", bangla: "নওগাঁ", x: 251, y: 668, division: "Rajshahi" },
  { name: "Sherpur", bangla: "শেরপুর", x: 708, y: 593, division: "Mymensingh" },
  { name: "Rangpur", bangla: "রংপুর", x: 417, y: 393, division: "Rangpur" },
];

export const districts: District[] = raw.map((d) => ({
  id: d.name.toLowerCase().replace(/['\s]/g, "-"),
  name: d.name,
  bangla: d.bangla,
  x: (d.x / VB_W) * 100,
  y: (d.y / VB_H) * 100,
  division: d.division,
  images: [],
}));

export const getDistrict = (id: string): District | undefined =>
  districts.find((d) => d.id === id);

export const divisionColors: Record<string, string> = {
  Dhaka: "hsl(160, 60%, 45%)",
  Chittagong: "hsl(180, 50%, 40%)",
  Rajshahi: "hsl(140, 50%, 40%)",
  Khulna: "hsl(200, 50%, 40%)",
  Barisal: "hsl(170, 55%, 42%)",
  Sylhet: "hsl(130, 45%, 38%)",
  Rangpur: "hsl(150, 55%, 43%)",
  Mymensingh: "hsl(190, 50%, 40%)",
};
