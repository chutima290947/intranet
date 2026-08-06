/* ------------------------------------------------------------------
   HEALTHCARE_PARTNERS
   รายชื่อรักษาพยาบาล (บริษัทคู่สัญญา) — แปลงมาจาก companies.json
   ใช้เป็น subItems ของ PARTNERS entry ชื่อ 'รายชื่อรักษาพยาบาล' ใน defaultContent.js
   รูปแบบแต่ละรายการตรงกับที่ buildDocs() และ PartnerDetailPage.jsx อ่าน:
   { label, expiry?, payorCode?, contact?, docs?: [{ label, href }] }
------------------------------------------------------------------ */

export const HEALTHCARE_PARTNERS = [
  {
    label: 'โรงเรียนในโครงการ Health Buddy @ School',
    expiry: 'Exp.31/12/2573',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089-9085293\nกรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายชื่อโรงเรียนทั้งหมด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%20Health%20Buddy%20@%20School.xlsx',
      },
      {
        label: 'มหาวิทยาลัยสงขลานครินทร์',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%AA%E0%B8%87%E0%B8%82%E0%B8%A5%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C.pdf',
      },
      {
        label: 'โรงเรียนกาญจนวัฒน์วิทยา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนขจรเกียรติโคกกลอย',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B9%82%E0%B8%84%E0%B8%81%E0%B8%81%E0%B8%A5%E0%B8%AD%E0%B8%A2.pdf',
      },
      {
        label: 'โรงเรียนขจรเกียรติเชิงทะเล',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%8A%E0%B8%B4%E0%B8%87%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5.pdf',
      },
      {
        label: 'โรงเรียนขจรเกียรติถลาง',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%96%E0%B8%A5%E0%B8%B2%E0%B8%87.pdf',
      },
      {
        label: 'โรงเรียนขจรเกียรติพัฒนา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนขจรเกียรติศึกษา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B8%88%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนถลางวิทยา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%96%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ คิว.เอส.ไอ. ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%84%E0%B8%B4%E0%B8%A7.%E0%B9%80%E0%B8%AD%E0%B8%AA.%E0%B9%84%E0%B8%AD.%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ บริติช ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%95%E0%B8%B4%E0%B8%8A%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ เบอร์ดา คล๊อด ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B8%B2%20%E0%B8%84%E0%B8%A5%E0%B9%8A%E0%B8%AD%E0%B8%94%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ฟินน์เวย์ ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%9F%E0%B8%B4%E0%B8%99%E0%B8%99%E0%B9%8C%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ยูดับเบิลยูซี',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%A2%E0%B8%B9%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%A5%E0%B8%A2%E0%B8%B9%E0%B8%8B%E0%B8%B5.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ร่วมฤดีวิเทศศึกษา ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B8%A4%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ไลท์เฮ้าส์ แอท ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%84%E0%B8%A5%E0%B8%97%E0%B9%8C%E0%B9%80%E0%B8%AE%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B9%8C%20%E0%B9%81%E0%B8%AD%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ไลท์เฮ้าส์ แอท ราไวย์',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%84%E0%B8%A5%E0%B8%97%E0%B9%8C%E0%B9%80%E0%B8%AE%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B9%8C%20%E0%B9%81%E0%B8%AD%E0%B8%97%20%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%A7%E0%B8%A2%E0%B9%8C.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ โอ๊ค มีโดว์',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%82%E0%B8%AD%E0%B9%8A%E0%B8%84%20%E0%B8%A1%E0%B8%B5%E0%B9%82%E0%B8%94%E0%B8%A7%E0%B9%8C.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ เฮดสตาร์ท (เจ้าฟ้า)',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%80%E0%B8%AE%E0%B8%94%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%97%20(%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%9F%E0%B9%89%E0%B8%B2).pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ เฮดสตาร์ท (เชิงทะเล)',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%80%E0%B8%AE%E0%B8%94%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%97%20(%E0%B9%80%E0%B8%8A%E0%B8%B4%E0%B8%87%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5).pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ เฮย์ สคูล ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%80%E0%B8%AE%E0%B8%A2%E0%B9%8C%20%E0%B8%AA%E0%B8%84%E0%B8%B9%E0%B8%A5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนบำรุงผกา ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B8%B3%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%9C%E0%B8%81%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนพุทธมงคลนิมิตร',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%A1%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%99%E0%B8%B4%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%A3.pdf',
      },
      {
        label: 'โรงเรียนวิชิตสงคราม',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A1.pdf',
      },
      {
        label: 'โรงเรียนอนุบาลกนกขวัญ',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%81%E0%B8%99%E0%B8%81%E0%B8%82%E0%B8%A7%E0%B8%B1%E0%B8%8D.pdf',
      },
      {
        label: 'โรงเรียนอนุบาลถลางวิทยา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%96%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนอนุบาลบ้านเล็กพัฒนา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนอนุบาลบุษบง',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9A%E0%B8%B8%E0%B8%A9%E0%B8%9A%E0%B8%87.pdf',
      },
      {
        label: 'โรงเรียนอนุบาลภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติคินเดอร์วิลล์โนวา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%84%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%A5%E0%B9%8C%E0%B9%82%E0%B8%99%E0%B8%A7%E0%B8%B2.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ เซเลสเทีย อันดามัน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B9%80%E0%B8%8B%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99.pdf',
      },
      {
        label: 'โรงเรียนนานาชาติ ป',
        href: 'http://10.161.11.22/images/uploads/marketing/MOU%20Health%20Buddy%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%95%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เลอ เมอริเดียน เขาหลัก รีสอร์ท แอนด์ สปา(บริษัท บางสักเมอร์ลิน จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.28/02/2574',
    payorCode: '6775860004',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Detail%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%80%E0%B8%A5%E0%B8%AD%20%E0%B9%80%E0%B8%A1%E0%B8%AD%E0%B8%A3%E0%B8%B4%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%99%20%E0%B9%80%E0%B8%82%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%20(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20Le%20meridien%20Khaolak.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%80%E0%B8%A5%E0%B8%AD%20%E0%B9%80%E0%B8%A1%E0%B8%AD%E0%B8%A3%E0%B8%B4%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%99%20%E0%B9%80%E0%B8%82%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีอาร์ ภูเก็ต (ประเทศไทย) จำกัด (สาขาที่ 00002) (โรบินสัน โอเชี่ยน จังซีลอน)',
    expiry: 'Exp.30/04/2574',
    payorCode: '6700990015',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%9A%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%99%20%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%20%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%8B%E0%B8%B5%E0%B8%A5%E0%B8%AD%E0%B8%99%20(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%A3%E0%B8%9A%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%99%20%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%20%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%8B%E0%B8%B5%E0%B8%A5%E0%B8%AD%E0%B8%99%20(2569-2574).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%9A%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%99%20%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%20%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%8B%E0%B8%B5%E0%B8%A5%E0%B8%AD%E0%B8%99%20(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เสือใหญ่กะทู้ จำกัด (สาขาที่ 00001) (ไทเกอร์ พาร์ค กะทู้ ภูเก็ต)',
    expiry: 'Exp.31/05/2574',
    payorCode: '6780650204',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B8%81%E0%B8%B0%E0%B8%97%E0%B8%B9%E0%B9%89%20(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B8%81%E0%B8%B0%E0%B8%97%E0%B8%B9%E0%B9%89%20(2569-2574).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B8%81%E0%B8%B0%E0%B8%97%E0%B8%B9%E0%B9%89%20(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ดีวาน่า โฮเทลแอนด์รีสอร์ท จำกัด (สำนักงานใหญ่) / โรงแรม ดีวาน่า ป่าตอง รีสอร์ท แอนด์ สปา (บริษัท ดีวาน่า โฮเทลแอนด์รีสอร์ท จำกัด) (สาขาที่ 00001) /โรงแรม ดีวาน่า พลาซ่า ภูเก็ต ป่าตอง (บริษัท ดีวาน่า โฮเทลแอนด์รีสอร์ท จำกัด) (สาขาที่ 00002) / โรงแรม รามาด้า ภูเก็ต ดีวาน่า (บริษัท ดีวาน่า โฮเทลแอนด์รีสอร์ท จำกัด) (สาขาที่ 00005)',
    expiry: 'Exp.31/03/2574',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255\nPayor Code : 6700354001 บจก. ดีวาน่า โฮเทลแอนด์รีสอร์ท (สำนักงานใหญ่)\nPayor Code : 6780650041 บจก. ดีวาน่า โฮเทลแอนด์รีสอร์ท (สาขาที่ 00001) โรงแรม ดีวาน่า ป่าตอง รีสอร์ท แอนด์ สปา\nPayor Code : 6780650042 บจก. ดีวาน่า โฮเทลแอนด์รีสอร์ท (สาขาที่ 00002) โรงแรม ดีวาน่า พลาซ่า ภูเก็ต ป่าตอง\nPayor Code : 6780650043 บจก. ดีวาน่า โฮเทลแอนด์รีสอร์ท (สาขาที่ 00005) โรงแรม รามาด้า ภูเก็ต ดีวาน่า',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Deevana%20(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign(2569-2574)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B9%82%E0%B8%AE%E0%B9%80%E0%B8%97%E0%B8%A5%E0%B9%81%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2569-2574)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%E0%B9%81%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%AA%E0%B8%9B%E0%B8%B2.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2569-2574)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B8%9E%E0%B8%A5%E0%B8%B2%E0%B8%8B%E0%B9%88%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2569-2574)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%A3%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B9%88%E0%B8%B2.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Deevana%20(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'โรงแรมภารีสา รีสอร์ท ภูเก็ต (บริษัท ภารีสา คอร์ปอเรชั่น จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/03/2574',
    payorCode: '6700369001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093 - 6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9BParesa.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/SigParesa.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/DeParesa.pdf',
      },
    ],
  },
  {
    label: 'ห้างโรบินสัน ไลฟ์สไตล์ ถลาง (บริษัท โรบินสัน จำกัด) (มหาชน) สาขาถลาง (สาขาที่ 00074)',
    expiry: 'Exp.30/06/2571',
    payorCode: '6780650046',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/DeParesa.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/SignatureRobinson.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/AgreementRobinson.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เจดับบลิว แมริออท ภูเก็ต รีสอร์ท แอนด์ สปา (บริษัท เอ็มไอ สแควร์ จำกัด) (สาขาที่ 00003)',
    expiry: 'Exp.28/02/2574',
    payorCode: '6700560002',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Details(2569-2574)JW.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20JW%20hotel%20clinic%20agreement.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Agreement%20JW(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'บริษัท พีโอซี จำกัด (สาขาที่ 00001)',
    expiry: 'Exp.31/12/2573',
    payorCode: '6780650174',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2569-2573)%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%9E%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%8B%E0%B8%B5(%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%8800001)%20(1).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%9E%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%8B%E0%B8%B5(%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%8800001).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2569-2573)%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%9E%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%8B%E0%B8%B5(%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%8800001).pdf',
      },
    ],
  },
  {
    label: 'บริษัท สกายร็อค แอดเวนเจอร์ส จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.28/02/2570',
    payorCode: '6775860024',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B9%87%E0%B8%AD%E0%B8%84%20(2569-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B9%87%E0%B8%AD%E0%B8%84%20(2569-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B9%87%E0%B8%AD%E0%B8%84%20(2569-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซอลท์ เซิร์ฟ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.28/02/2570',
    payorCode: '6775860025',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%8B%E0%B8%AD%E0%B8%A5%E0%B8%97%E0%B9%8C%20%E0%B9%80%E0%B8%8B%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9F%20(2569-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%8B%E0%B8%AD%E0%B8%A5%E0%B8%97%E0%B9%8C%20%E0%B9%80%E0%B8%8B%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9F%20(2569-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%8B%E0%B8%AD%E0%B8%A5%E0%B8%97%E0%B9%8C%20%E0%B9%80%E0%B8%8B%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%9F%20(2569-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท จอห์น เกรย์ ซี แคนู จำกัด',
    expiry: 'Exp.28/02/2574',
    payorCode: '6700990018',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%88%E0%B8%AD%E0%B8%AB%E0%B9%8C%E0%B8%99%20%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%A2%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B9%81%E0%B8%84%E0%B8%99%E0%B8%B9%20(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%88%E0%B8%AD%E0%B8%AB%E0%B9%8C%E0%B8%99%20%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%A2%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B9%81%E0%B8%84%E0%B8%99%E0%B8%B9%20(2569-2574).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Intranet%20%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%AF%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%88%E0%B8%AD%E0%B8%AB%E0%B9%8C%E0%B8%99%20%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%A2%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B9%81%E0%B8%84%E0%B8%99%E0%B8%B9.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม อมันปุรี (บริษัท อันดามัน รีสอร์ท จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/11/2573',
    payorCode: '6775570017',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20(2568-2573)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%AD%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%9B%E0%B8%B8%E0%B8%A3%E0%B8%B5.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20(2568-2573)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%AD%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%9B%E0%B8%B8%E0%B8%A3%E0%B8%B5.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20(2568-2573)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%AD%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%9B%E0%B8%B8%E0%B8%A3%E0%B8%B5.pdf',
      },
    ],
  },
  {
    label: 'บริษัท เซ็นทรัลพัฒนา จำกัด (มหาชน) (สำนักงานใหญ่) / บริษัท เซ็นทรัลพัฒนา จำกัด (มหาชน) (สาขาที่ 00015) (เซ็นทรัล เฟสติวัล ภูเก็ต) / บริษัท เซ็นทรัลพัฒนา จำกัด (มหาชน) (สาขาที่ 00018) (เซ็นทรัล ภูเก็ต ฟลอเรสต้า)',
    expiry: 'Exp.31/12/2570',
    contact: 'พนักงานสาขาที่ 00015 และ สาขาที่ 00018 และ สำนักงานใหญ่ เข้ารับบริการ โดยแสดงใบส่งตัวจากระบบของบริษัท ฯ ทางมือถือ (ใบส่งตัวอิเล็กทรอนิกส์)','เลขที่ใบส่งตัว EPT PK1 บมจ. เซ็นทรัลพัฒนา (สาขาที่ 00015) เซ็นทรัล เฟสติวัล ภูเก็ต'
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20(2569-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20(2569-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20(2569-2570).pdf',
      },
      {
        label: 'เอกสารแนบท้ายสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%99%E0%B8%9A%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%87%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%82%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%81%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5.pdf',
      },
    ],
  },
  {
    label: '- เลขที่ใบส่งตัว EPT PK1 บมจ. เซ็นทรัลพัฒนา (สาขาที่ 00015) เซ็นทรัล เฟสติวัล ภูเก็ต',
  },
  {
    label: '- เลขที่ใบส่งตัว EPT PKT บมจ. เซ็นทรัลพัฒนา (สาขาที่ 00018) เซ็นทรัล ภูเก็ต ฟลอเรสต้า',
  },
  {
    label: '-เลขที่ใบส่งตัว EPT HOF บมจ. เซ็นทรัลพัฒนา (สำนักงานใหญ่)',
    payorCode: '6700520001',
    contact: 'เอกสารประกอบการวางบิล',
  },
  {
    label: '- ใบส่งตัว / ใบส่งตัวอิเล็กทรอนิกส์',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- สำเนา Invocie ค่าใช้จ่ายส่วนแรก (พนักงานชำระเงินเอง 1,000 บาท) + Invoce ส่วนที่สอง วางบิลบริษัท',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
  },
  {
    label: 'บริษัท วอลเล็ม ชิปปิ้ง (ประเทศไทย) จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/1/2572',
    payorCode: '6780650173',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A7%E0%B8%AD%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%A1%20(2568-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%A7%E0%B8%AD%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%A1%20(2568-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A7%E0%B8%AD%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%A1%20(2568-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท วันซ์ ยอชติ้ง จำกัด',
    expiry: 'Exp.31/10/2569',
    payorCode: '6780650170',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%AD%E0%B8%8A%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%87%20(2568-2569).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%AD%E0%B8%8A%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%87%20(2568-2569).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%AD%E0%B8%8A%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%87%20(2568-2569).pdf',
      },
    ],
  },
  {
    label: 'บริษัท โบ๊ทพัฒนา คอนสตรัคชั่น จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/09/2569',
    payorCode: '6780650130',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B8%B1%E0%B8%84%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B8%B1%E0%B8%84%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะ เซนส์เซส รีสอร์ท แอนด์ พูลวิลล่า (บริษัท เดอะเซนส์เซส รีสอร์ท จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.31/10/2573',
    payorCode: '6700399001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B9%80%E0%B8%8B%E0%B8%99%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B8%AA%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B9%80%E0%B8%8B%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AA%202568-2573.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B9%80%E0%B8%8B%E0%B8%99%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B8%AA%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะ เซนส์เซส รีสอร์ท (บริษัท อรุณเพลส จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.31/10/2573',
    payorCode: '6700736002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%AA%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%AA%202568-2573.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%93%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%AA%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท แบมบูมาร์ท จำกัด (ร้านแบมบูมาร์ท)',
    expiry: 'Exp.31/10/2573',
    payorCode: '6700990011',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Bamboomart%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20Bamboomart%202568-2573.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Bamboomart%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ป.พิชัย นาวา จำกัด',
    expiry: 'Exp.30/04/2571',
    payorCode: '6700483001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9B.%E0%B8%9E%E0%B8%B4%E0%B8%8A%E0%B8%B1%E0%B8%A2%E0%B8%99%E0%B8%B2%E0%B8%A7%E0%B8%B2%20(2568-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9B.%E0%B8%9E%E0%B8%B4%E0%B8%8A%E0%B8%B1%E0%B8%A2%E0%B8%99%E0%B8%B2%E0%B8%A7%E0%B8%B2%20(2568-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9B.%E0%B8%9E%E0%B8%B4%E0%B8%8A%E0%B8%B1%E0%B8%A2%E0%B8%99%E0%B8%B2%E0%B8%A7%E0%B8%B2%20(2568-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท อุตสาหกรรมไหมไทย จำกัด (จิม ทอมป์สัน)',
    expiry: 'Exp.31/07/2570',
    payorCode: '6700531001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%88%E0%B8%B4%E0%B8%A1%20%E0%B8%97%E0%B8%AD%E0%B8%A1%E0%B8%9B%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B8%99%20(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%88%E0%B8%B4%E0%B8%A1%20%E0%B8%97%E0%B8%AD%E0%B8%A1%E0%B8%9B%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B8%99%20(2568-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%88%E0%B8%B4%E0%B8%A1%20%E0%B8%97%E0%B8%AD%E0%B8%A1%E0%B8%9B%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B8%99%20(2568-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม มิดทาวน์ รัษฎา (บริษัท ภูเก็ต มิดทาวน์ จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.31/07/2570',
    payorCode: '6780650147',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A1%E0%B8%B4%E0%B8%94%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%20%E0%B8%A3%E0%B8%B1%E0%B8%A9%E0%B8%8E%E0%B8%B2%20(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B8%A1%E0%B8%B4%E0%B8%94%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%20%E0%B8%A3%E0%B8%B1%E0%B8%A9%E0%B8%8E%E0%B8%B2%20(2568-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A1%E0%B8%B4%E0%B8%94%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%20%E0%B8%A3%E0%B8%B1%E0%B8%A9%E0%B8%8E%E0%B8%B2%20(2568-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซาวานู ทราเวล จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/07/2569',
    payorCode: '6780650160',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%8B%E0%B8%B2%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%B9%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%A7%E0%B8%A5%20(2568-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%8B%E0%B8%B2%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%B9%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%A7%E0%B8%A5%20(2568-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%8B%E0%B8%B2%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%B9%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%A7%E0%B8%A5%20(2568-2571).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
  },
  {
    label: 'บริษัท สกายลูจ แอดเวนเจอร์ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/08/2571',
    payorCode: '6780650161',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%88%20(2568-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%88%20(2568-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%88%20(2568-2571).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
  },
  {
    label: 'โรงแรม ถาวร ปาล์มบีช รีสอร์ท (บริษัท เจริญชนะ (1986) จำกัด) (สาขาที่ 00002)',
    expiry: 'Exp.31/08/2573',
    payorCode: '6780650038',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%96%E0%B8%B2%E0%B8%A7%E0%B8%A3%20%E0%B8%9B%E0%B8%B2%E0%B8%A5%E0%B9%8C%E0%B8%A1%20%E0%B8%9A%E0%B8%B5%E0%B8%8A%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(2568-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%96%E0%B8%B2%E0%B8%A7%E0%B8%A3%20%E0%B8%9B%E0%B8%B2%E0%B8%A5%E0%B9%8C%E0%B8%A1%20%E0%B8%9A%E0%B8%B5%E0%B8%8A%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(2568-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%96%E0%B8%B2%E0%B8%A7%E0%B8%A3%20%E0%B8%9B%E0%B8%B2%E0%B8%A5%E0%B9%8C%E0%B8%A1%20%E0%B8%9A%E0%B8%B5%E0%B8%8A%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(2568-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ถาวร บีช วิลเลจ รีสอร์ท แอนด์ สปา (บริษัท เจริญชนะ (1986) จำกัด) (สาขาที่ 00003)',
    expiry: 'Exp.31/08/2573',
    payorCode: '6780650039',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%96%E0%B8%B2%E0%B8%A7%E0%B8%A3%E0%B8%9A%E0%B8%B5%E0%B8%8A%20%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B8%88%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20%E0%B8%A3%E0%B8%9E.%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%A3%E0%B8%B4%E0%B9%82%E0%B8%A3%E0%B8%88%E0%B8%99%E0%B9%8C.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B9%80%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8A%E0%B8%99%E0%B8%B0(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม แกรนด์ เมอร์เคียว ภูเก็ต ป่าตอง (บริษัท เอส. ไทรอัมฟ์ แลนด์ จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/08/2573',
    payorCode: '6700291001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Grand%20Mercure%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%202568%20Grand%20Mercure%20Patong.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Grand%20Mercure%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ไอบิส ภูเก็ต ป่าตอง (บริษัท เอราวัณ โกรท เมเนจเม้นท์ จำกัด) (สาขาที่ 00002)',
    expiry: 'Exp.31/07/2573',
    payorCode: '6700352002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Ibis%20Patong%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%202568%20Ibis%20Patong.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Ibis%20Patong(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท คุ้มเสือตระการ จำกัด (สาขาที่ 00003) (ไทเกอร์คิงดอม)',
    expiry: 'Exp.31/07/2573',
    payorCode: '6700789002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B8%99%E0%B8%95%E0%B9%8C%20%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20Update%2013-5-69.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม อมารี ภูเก็ต (บริษัท อิตัลไทย เรียล เอ็ซเทท จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/08/2573',
    payorCode: '6700395001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Amari%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Amari%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Amari%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เซ็นทารา แกรนด์ บีช รีสอร์ท ภูเก็ต (บริษัท เซ็นทรัลสมุยบีชรีสอร์ท จำกัด) (สาขาจังหวัดภูเก็ต) (สาขาที่ 00002)',
    expiry: 'Exp.31/05/2573',
    payorCode: '6700767002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Centara%20Grand%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Centara%20Grand%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Centara%20Grand%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ทราย ลากูน่า ภูเก็ต (บริษัท ลากูน่า ภูเก็ต คลับ จำกัด)',
    expiry: 'Exp.31/05/2573',
    payorCode: '6775570001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2%20%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2%20%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2%20%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%E0%B9%88%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ศาลา ภูเก็ต ไม้ขาว บีช รีสอร์ท (บริษัท ศาลา ภูเก็ต จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/05/2573',
    payorCode: '6700638001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2568-2573)%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%B2.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20Sala.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2568-2573)%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%B2.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ไอยรา กมลา รีสอร์ท แอนด์ สปา (บริษัท กมลา ดีเวลลอปเม้นต์ จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.31/07/2573',
    payorCode: '6700342001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Ayara%20Kamala%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sing%20%20Ayara%20Kamala%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Ayara%20Kamala%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท สกายเทร็ค แอดเวนเจอร์ส จำกัด (ไฟล์อิ้ง หนุมาน)',
    expiry: 'Exp.31/07/2573',
    payorCode: '6700517001',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B9%87%E0%B8%84(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B9%87%E0%B8%84(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%AA%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B9%87%E0%B8%84(2568-2573).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
  },
  {
    label: 'บริษัท ไทยแลนด์สเมลติ้ง แอนด์ รีไฟนิ่ง จำกัด (สาขาที่ 00001) (ไทยซาร์โก้)',
    expiry: 'Exp.31/05/2570',
    payorCode: '6700782002',
    contact: 'กรณีมีปัญหาติดต่อ ผู้ประสานงานบริษัท คุณสวรรยา รักหาบ (บ๊ะ) โทรศัพท์ 089 - 4753616\nกรณีมีปัญหาติดต่อ ผู้ประสานงานโรงพยาบาล คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Thai%20Sarco%20(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Thai%20Saco%20(2568-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Thai%20Saco%20(2568-2570).pdf',
      },
      {
        label: 'รายชื่อพนักงาน',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B8%84%E0%B8%A3%E0%B8%AD%E0%B8%9A%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%A7%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%8B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%81%E0%B9%89%20%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%9B%E0%B8%B5%20%202569%20(16.04.2026).pdf',
      },
      {
        label: 'เอกสารประกอบการเบิก',
        href: 'http://10.161.11.22/images/uploads/marketing/RefSAR.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เคป เซียนนา กรูเมต์ โฮเต็ล แอนด์ วิลลา (บริษัท พาราไดซ์ บีช กมลา จำกัด)',
    expiry: 'Exp.31/05/2573',
    payorCode: '6700977001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%84%E0%B8%9B%20%E0%B9%80%E0%B8%8B%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%80%E0%B8%84%E0%B8%9B%20%E0%B9%80%E0%B8%8B%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%84%E0%B8%9B%20%E0%B9%80%E0%B8%8B%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%99%E0%B8%B2%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท โอนนิ่ง พาราไดซ์ จำกัด',
    expiry: 'Exp.31/05/2573',
    payorCode: '6780650121',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ป่าตองรีสอร์ท (บริษัท ป่าตองรีสอร์ท โฮเต็ล จำกัด)',
    expiry: 'Exp.31/05/2573',
    payorCode: '6700304002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Patong%20Resort%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Patong%20Resort.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Patong%20Resort%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เค.พี.เอ็น.ซีเนียร์ โซลูชั่น จำกัด (สำนักงานใหญ่) (ฮาร์โมนิ โฮมแคร์ ภูเก็ต)',
    expiry: 'Exp.31/01/2573',
    payorCode: '6780650149',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%AE%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%A1%E0%B8%99%E0%B8%B4%20%E0%B9%82%E0%B8%AE%E0%B8%A1%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B9%8C%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%AE%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%A1%E0%B8%99%E0%B8%B4%20%E0%B9%82%E0%B8%AE%E0%B8%A1%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B9%8C%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%AE%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%82%E0%B8%A1%E0%B8%99%E0%B8%B4%20%E0%B9%82%E0%B8%AE%E0%B8%A1%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B9%8C%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เพอร์เฟค คอมพาเนียน กรุ๊ป จำกัด',
    expiry: 'Exp.31/01/2573',
    payorCode: '6780650028',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%9E%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%9F%E0%B8%84%20%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%99%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%80%E0%B8%9E%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%9F%E0%B8%84%20%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%99%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%9E%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%9F%E0%B8%84%20%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%99%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ไตรกรุ๊ปรัชดา จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/12/2570',
    payorCode: '6780650144',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%84%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2%20(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B9%84%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2%20(2568-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%84%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2%20(2568-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท 3 พร จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/12/2570',
    payorCode: '6780650143',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%203%20%E0%B8%9E%E0%B8%A3%20(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%203%20%E0%B8%9E%E0%B8%A3%20(2568-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%203%20%E0%B8%9E%E0%B8%A3%20(2568-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม วี วิลล่า ภูเก็ต - เอ็มแกลเลอรี่ (บริษัท วิชญะ ภูเก็ต จำกัด) (สาขาที่ 0001)',
    expiry: 'Exp.30/11/2572',
    payorCode: '6780650127',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20V%20Villas%20Phuket%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20V%20Villas%20Phuket%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20V%20Villas%20Phuket%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ต ไซม่อนคาบาเรต์ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/11/2572',
    payorCode: '6700503001',
    contact: 'ผู้บริหาร 4 ท่าน เข้ารับบริการ วางบิลได้ทุกกรณี โดยไม่ต้องใช้เอกสารใบส่งตัว / ไม่ต้องเซ็นต์ชื่อเอกสารวางบิล / ไม่ต้องใช้ใบรับรองแพทย์ 1. คุณสัมฤทธิ์ รวยริน 2. คุณวิรัตน์ รวยริน 3. คุณพรวิช รวยริน 4. คุณพรเทพ รวยริน)\nกรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Simon%20Carbaret%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20Simon%20Carbaret.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Contract%20Simon%20Carbaret.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะ ยามา โฮเต็ล ภูเก็ต (บริษัท ปุรณาการ จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.30/11/2572',
    payorCode: '6780650008',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20The%20Yama%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20The%20Yama%202567-2572.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Contract%20The%20Yama%202567%20-%202572.pdf',
      },
    ],
  },
  {
    label: 'บริษัท อันดามัน ซี โซ ไนซ์ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/12/2570',
    payorCode: '6780650145',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ไทยยามาฮ่ามอเตอร์ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/11/2570',
    payorCode: '6780650138',
    contact: 'URL การตรวจสอบใบส่งตัวออนไลน์ : https:// yhcc-exp.yamaha-motor.co.th\nเอกสารประกอบการวางบิล - หนังสือส่งตัวพร้อมลายเซ็นพนักงาน - สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน - ใบรับรองแพทย์ / ใบเคลมหรือใบรายละเอียดค่ารักษาพยาบาล / ใบแจ้งหนี้\nกรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%AE%E0%B9%88%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%AE%E0%B9%88%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.pdf',
      },
      {
        label: 'คู่มือการใช้งาน',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%AE%E0%B9%88%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C.pdf',
      },
    ],
  },
  {
    label: '- หนังสือส่งตัวพร้อมลายเซ็นพนักงาน',
  },
  {
    label: '- สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลมหรือใบรายละเอียดค่ารักษาพยาบาล / ใบแจ้งหนี้',
  },
  {
    label: 'บริษัท บริการภาคพื้น ท่าอากาศยานไทย จำกัด (สำนักงานใหญ่) (Ambulance transfer service)',
    expiry: 'Exp.31/12/2570',
    payorCode: '670070001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2568-2570%20%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%9B).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/SignatureAOTGA.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Quotation%20&%20Accept%20Ambulance%20transfer.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Agreement%20Ambulance(2568-2570%20).pdf',
      },
    ],
  },
  {
    label: 'บริษัท บีกิน ทัวร์ จำกัด (สำนักงานใหญ่) (เอราวัณ ป่าตอง ซีวิว ซิปไลน์)',
    expiry: 'Exp.31/10/2570',
    payorCode: '6780650136',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%B5%E0%B8%81%E0%B8%B4%E0%B8%99%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%B5%E0%B8%81%E0%B8%B4%E0%B8%99%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%B5%E0%B8%81%E0%B8%B4%E0%B8%99%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ดอกเตอร์ เอนีแวร์ คลินิก จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/07/2570',
    payorCode: '6780650114',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B8%99%E0%B8%B5%E0%B9%81%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ดีเวอร์ อินเทลลิเจนซ์ ยูทส์ จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.31/10/2570',
    payorCode: '6780650132',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A5%E0%B8%A5%E0%B8%B4%E0%B9%80%E0%B8%88%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%B9%E0%B8%97%E0%B8%AA%E0%B9%8C%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A5%E0%B8%A5%E0%B8%B4%E0%B9%80%E0%B8%88%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%B9%E0%B8%97%E0%B8%AA%E0%B9%8C%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A5%E0%B8%A5%E0%B8%B4%E0%B9%80%E0%B8%88%E0%B8%99%E0%B8%8B%E0%B9%8C%20%E0%B8%A2%E0%B8%B9%E0%B8%97%E0%B8%AA%E0%B9%8C%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ไดมอนด์ ซี มารีน จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6780650133',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/sign%20%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%20%E0%B8%8B%E0%B8%B5%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เซ็นทรัล เรสเตอรองส์ กรุ๊ป จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6780650124',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%8C%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%8C%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%8C%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%20(2567-2570).pdf',
      },
      {
        label: 'วงเงินค่ารักษาพยาบาลและตัวอย่างใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7_%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%8C%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%20(CRG)_17%20Mar%202025.pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีอาร์จี อินเตอร์เนชั่นแนล ฟู้ด จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6780650123',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20CRG%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20CRG%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20CRG%20(2567-2570).pdf',
      },
      {
        label: 'วงเงินค่ารักษาพยาบาลและตัวอย่างใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7_%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B9%8C%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B%20(CRG)_17%20Mar%202025.pdf',
      },
    ],
  },
  {
    label: 'บริษัท รอยัล ภูเก็ต มารีน่า (2002) จำกัด',
    expiry: 'Exp.30/09/2572',
    payorCode: '6700303001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A3%E0%B8%AD%E0%B8%A2%E0%B8%B1%E0%B8%A5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B9%88%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%A3%E0%B8%AD%E0%B8%A2%E0%B8%B1%E0%B8%A5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B9%88%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A3%E0%B8%AD%E0%B8%A2%E0%B8%B1%E0%B8%A5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B9%88%E0%B8%B2%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีสตาร์ อันดามัน จำกัด',
    expiry: 'Exp.30/09/2570',
    payorCode: '6780650128',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Sea%20Star%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Sea%20Star%20(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Sea%20Star%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
  },
  {
    label: 'โรงแรม โนโวเทล โภคีธรา แอนด์ อีบิส สไตล์ ภูเก็ต ซิตี้ (บริษัท ไทยนครดีเวลลอปเม้นท์ จำกัด) (สำนักงานใหญ่)',
    expiry: 'Exp.31/7/2572',
    payorCode: '6700516001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Phokeetara%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Phokeethara%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Phokeethara%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'โรงเรียนนานาชาติ ยูดับเบิลยูซี ประเทศไทย',
    expiry: 'Exp.31/12/2571',
    payorCode: '6700778003',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/Detail%20UWC%20(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/SignatureUWCUpdate5March69.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Contract%20UWC%20(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท สกายเวิลด์ แอดเวนเจอร์ จำกัด (หนุมาน เวิลด์)',
    expiry: 'Exp.30/04/2572',
    payorCode: '6700990019',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Sky%20World(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Sky%20World%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Sky%20World%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
  },
  {
    label: 'บริษัท เดอะ คอรัล รีฟ คาบาน่า จำกัด',
    expiry: 'Exp.30/04/2572',
    payorCode: '6700990020',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B8%9F%20%E0%B8%84%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%99%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B8%9F%20%E0%B8%84%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%99%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B8%9F%20%E0%B8%84%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%99%E0%B8%B2%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'การยางแห่งประเทศไทย No Expiration Date',
    contact: 'กรณีบัตรประจำตัวเจ้าหน้าที่ของรัฐหรือบุคคลในครอบครัวหมดอายุ ต้องยื่นหนังสือรับรองสิทธิในการเข้ารับการรักษาพยาบาลแทน\nกรณีมีปัญหาติดต่อ คุณจันทิมา เตี๋ยวสกุล (ขวัญ) โทรศัพท์ 081-5379899',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2%20(%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B9%80%E0%B8%A1%E0%B8%A9%E0%B8%B2%E0%B8%A2%E0%B8%99%202567).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2%20(%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B9%80%E0%B8%A1%E0%B8%A9%E0%B8%B2%E0%B8%A2%E0%B8%99%202567).pdf',
      },
      {
        label: 'ตัวอย่างหนังสือรับรองสิทธิการเข้ารับการรักษาพยาบาลพนักงานและลูกจ้าง',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%87.pdf',
      },
      {
        label: 'ตัวอย่างหนังสือรับรองสิทธิการเข้ารับการรักษาพยาบาลบุคคลในครอบครัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%AD%E0%B8%9A%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%A7.pdf',
      },
      {
        label: 'ตัวอย่างหนังสือส่งตัว (พนักงาน ลูกจ้าง)',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20(%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%20%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%87).pdf',
      },
      {
        label: 'ตัวอย่างหนังสือส่งตัว (บุคคลในครอบครัว)',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7(%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5%E0%B9%83%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%AD%E0%B8%9A%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%A7).pdf',
      },
    ],
  },
  {
    label: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธกส.)',
    expiry: 'Exp.28/02/2572',
    payorCode: '6700407001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%95%E0%B8%81%E0%B8%A5%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%98%E0%B8%81%E0%B8%AA.(2568-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%98%E0%B8%81%E0%B8%AA.%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%98%E0%B8%81%E0%B8%AA.%20(2567-2572).pdf',
      },
      {
        label: 'หนังสือแจ้งเปลี่ยนแปลงสิทธิ์ค่าห้อง',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%87%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%20(BSI).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ต เอทีวี ทัวร์ จำกัด',
    expiry: 'Exp.28/02/2572',
    payorCode: '6700826001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B9%80%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%A7%E0%B8%B5%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B9%80%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%A7%E0%B8%B5%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B9%80%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%A7%E0%B8%B5%20%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C%20%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท อี.เอ.เอส.มาริไทม์เอเยนซี่ (ไทยแลนด์) จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.28/02/2570',
    payorCode: '6700324001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%B5.%E0%B9%80%E0%B8%AD.%E0%B9%80%E0%B8%AD%E0%B8%AA.%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B4%E0%B9%84%E0%B8%97%E0%B8%A1%E0%B9%8C%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A2%E0%B8%99%E0%B8%8B%E0%B8%B5%E0%B9%88%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%20%E0%B8%AD%E0%B8%B5.%E0%B9%80%E0%B8%AD.%E0%B9%80%E0%B8%AD%E0%B8%AA.%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B4%E0%B9%84%E0%B8%97%E0%B8%A1%E0%B9%8C%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A2%E0%B8%99%E0%B8%8B%E0%B8%B5%E0%B9%88%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)(2567-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%B5.%E0%B9%80%E0%B8%AD.%E0%B9%80%E0%B8%AD%E0%B8%AA.%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B4%E0%B9%84%E0%B8%97%E0%B8%A1%E0%B9%8C%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A2%E0%B8%99%E0%B8%8B%E0%B8%B5%E0%B9%88%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ไดมอนด์ คอทเทจ รีสอร์ท แอนด์ สปา (บริษัท ไดมอนด์ คอทเทจ รีสอร์ท จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/03/2572',
    payorCode: '6700340001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Dimond%20Cottage%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20Dimond%20Cottage.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Contract%202567%20Dimond%20Cottage.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม นามาคา รีสอร์ท กมลา (บริษัท อความารีน รีสอร์ท จำกัด)',
    expiry: 'Exp.31/1/2572',
    payorCode: '6780650097',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%B2%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%B2%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะซเลท (บริษัท เพิร์ลวิลเลจ จำกัด)',
    expiry: 'Exp.31/01/2572',
    payorCode: '6780650108',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572)%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%8B%E0%B9%80%E0%B8%A5%E0%B8%97.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%8B%E0%B9%80%E0%B8%A5%E0%B8%97.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572)%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%8B%E0%B9%80%E0%B8%A5%E0%B8%97.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม พูลแมน ภูเก็ต อาเคเดีย ในทอน บีช (บริษัท แฟร์ แอนด์ เฟิร์ม จำกัด)',
    expiry: 'Exp.31/01/2572',
    payorCode: '6700570002',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Update%20%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%9E%E0%B8%B9%E0%B8%A5%E0%B9%81%E0%B8%A1%E0%B8%99%20%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%AD%E0%B8%99%20(%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%81%E0%B8%9F%E0%B8%A3%E0%B9%8C%20%E0%B9%81%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%20%E0%B9%80%E0%B8%9F%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%A1)%20(%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%2000001).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572)%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%9E%E0%B8%B9%E0%B8%A5%E0%B9%81%E0%B8%A1%E0%B8%99%20%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%AD%E0%B8%99%20%E0%B8%9A%E0%B8%B5%E0%B8%8A.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เลอ เมอริเดียน ภูเก็ต ไม้ขาว บีช รีสอร์ท (บริษัท นารายณ์โฮเต็ล จำกัด (สาขาที่ 00005) จำกัด)',
    expiry: 'Exp.31/12/2569',
    payorCode: '6700570002',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2569).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature%20Narai.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Agreement%20Narai2026.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม คอร์ทยาร์ด บาย แมริออท ภูเก็ต, ป่าตอง บีช รีสอร์ท (บริษัท ป่าตองเมอร์ลิน จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/01/2572',
    payorCode: '6700830001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Courtyard%20Patong%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C%20Courtyard%20Patong.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%202024%20Courtyard%20Patong.pdf',
      },
    ],
  },
  {
    label: 'บริษัท 5 สตาร์ มารีน จำกัด  (ระงับเครดิตชั่วคราว ติดต่อ คุณพรรณกร หนักแน่น โทรศัพท์ 064-9282228)',
    expiry: 'Exp.31/12/2571',
    payorCode: '6700529001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%205%20%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%205%20%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%205%20%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เซเว่นมารีน จำกัด',
    expiry: 'Exp.31/01/2572',
    payorCode: '6700447002',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%80%E0%B8%A7%E0%B9%88%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%A5%E0%B8%87%E0%B8%99%E0%B8%B2%E0%B8%A1%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%80%E0%B8%A7%E0%B9%88%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%2013.08.67.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%8B%E0%B9%80%E0%B8%A7%E0%B9%88%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เนปจูน (ไทยแลนด์) จำกัด',
    expiry: 'Exp.31/12/2571',
    payorCode: '6780650001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%99%E0%B8%9B%E0%B8%88%E0%B8%B9%E0%B8%99%20(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%99%E0%B8%9B%E0%B8%88%E0%B8%B9%E0%B8%99%20(2567-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%99%E0%B8%9B%E0%B8%88%E0%B8%B9%E0%B8%99%20(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท อนุภาษประมวลกิจ จำกัด',
    expiry: 'Exp.31/12/2571',
    payorCode: '6700990017',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%B4%E0%B8%88%20(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%A1%E0%B8%B7%E0%B8%AD%20%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%B4%E0%B8%88%20(2567-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%B4%E0%B8%88%20(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีทัวร์ จำกัด (สาขาที่ 00011)',
    expiry: 'Exp.31/12/2571',
    payorCode: '6700477001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%8B%E0%B8%B5%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%8B%E0%B8%B5%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C(2567-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%8B%E0%B8%B5%E0%B8%97%E0%B8%B1%E0%B8%A7%E0%B8%A3%E0%B9%8C(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ภูเก็ต เอมเมอรัล บีช รีสอร์ท (บริษัท ภูเก็ต เอมเมอรัล รีสอร์ท จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.30/11/2571',
    payorCode: '6780650102',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Phuket%20Emeral%20Resort%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20Phuket%20Emerald%20Resort.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%20Phuket%20Emerald%20Resort.pdf',
      },
    ],
  },
  {
    label: 'บริษัท เอ็ม เอส ไอ จี ประกันภัย จำกัด (มหาชน) (สำหรับพนักงานและครอบครัว)',
    expiry: 'Exp.30/09/2571',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20MSIG%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20MSIG%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20MSIG%20(2566-2571).pdf',
      },
      {
        label: 'Payor Code :',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20AFS%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'มูลนิธิการศึกษาและวัฒนธรรมสัมพันธ์ไทย - นานาชาติ (เอเอฟเอส ประเทศไทย)',
    expiry: 'Exp.31/08/2571',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20AFS%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20AFS.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20AFS%20(2566-2571).pdf',
      },
      {
        label: 'Payor Code :',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20AFS%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม วินด์แฮม การ์เด้น ในทอน ภูเก็ต (บริษัท บีสตาร์ท ฮอสพิทอลลิตี้ จำกัด)',
    expiry: 'Exp.31/08/2569',
    payorCode: '6780650088',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%A7%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B9%81%E0%B8%AE%E0%B8%A1%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%94%E0%B9%89%E0%B8%99%20%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%AD%E0%B8%99%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2566-2569).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%A7%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B9%81%E0%B8%AE%E0%B8%A1%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%94%E0%B9%89%E0%B8%99%20%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%AD%E0%B8%99%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2566-2569).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%A7%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B9%81%E0%B8%AE%E0%B8%A1%20%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%94%E0%B9%89%E0%B8%99%20%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%AD%E0%B8%99%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2566-2569).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ว้าว อันดามัน จำกัด',
    expiry: 'Exp.31/08/2569',
    payorCode: '6780650082',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A7%E0%B9%89%E0%B8%B2%E0%B8%A7%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(2566-2569).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A7%E0%B9%89%E0%B8%B2%E0%B8%A7%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(2566-2569).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A7%E0%B9%89%E0%B8%B2%E0%B8%A7%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(2566-2569).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เอสไฟว์ เอเชีย จำกัด',
    expiry: 'Exp.31/08/2571',
    payorCode: '6775860001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%84%E0%B8%9F%E0%B8%A7%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%84%E0%B8%9F%E0%B8%A7%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%84%E0%B8%9F%E0%B8%A7%E0%B9%8C%20%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม มีเลีย ภูเก็ต ไม้ขาว (บริษัท ภูเก็ตมานา จำกัด)',
    expiry: 'Exp.31/05/2571',
    payorCode: '6780650056',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089-9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature%20Melia.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท นนทศักดิ์ มารีน จำกัด',
    expiry: 'Exp.31/07/2569',
    payorCode: '6700482001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%A8%E0%B8%B1%E0%B8%81%E0%B8%94%E0%B8%B4%E0%B9%8C%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2566-2569).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%A8%E0%B8%B1%E0%B8%81%E0%B8%94%E0%B8%B4%E0%B9%8C%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2566-2569).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%A8%E0%B8%B1%E0%B8%81%E0%B8%94%E0%B8%B4%E0%B9%8C%20%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99%20(2566-2569).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ต เอ แอนด์ เค ไรเซ่น จำกัด (อันดามัน ซี คายัค)',
    expiry: 'Exp.31/05/2571',
    payorCode: '6700488001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%8B%E0%B8%B5%20%E0%B8%84%E0%B8%B2%E0%B8%A2%E0%B8%B1%E0%B8%84%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%8B%E0%B8%B5%20%E0%B8%84%E0%B8%B2%E0%B8%A2%E0%B8%B1%E0%B8%84%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2%E0%B8%A1%E0%B8%B1%E0%B8%99%20%E0%B8%8B%E0%B8%B5%20%E0%B8%84%E0%B8%B2%E0%B8%A2%E0%B8%B1%E0%B8%84%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ต พาราไดซ์ ทริป จำกัด',
    expiry: 'Exp.30/04/2573',
    payorCode: '6700497001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/SIgn%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2568-2573).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B8%8B%E0%B9%8C%20%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ทริปเปิลที บรอดแบนด์ จำกัด (มหาชน) (3BB)',
    expiry: 'Exp.30/04/2571',
    payorCode: '6700480001 **วางบิลเฉพาะเคส OPD วงเงินรักษาพยาบาล 10,000 บาท/คน/ปี',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%203BB%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%203BB%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%203BB%20(2566-2571).pdf',
      },
      {
        label: 'ตัวอย่างบัตรพนักงาน',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%203BB%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท วานา นาวา จำกัด (สาขาที่ 00003) (สวนน้ำ อันดามันดา ภูเก็ต)',
    expiry: 'Exp.31/03/2571',
    payorCode: '67806500005',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Andamanda%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Updated%20sign%20Andamanda_2567.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Andamanda%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ศรีพันวา (บริษัท ชาญอิสสระ เรสซิเดนซ์ จำกัด)',
    expiry: 'Exp.28/02/2571',
    payorCode: '6780650007 บริษัท ชาญอิสสระ เรสซิเดนซ์ จำกัด',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%8A%E0%B8%B2%E0%B8%8D%E0%B8%AD%E0%B8%B4%E0%B8%AA%E0%B8%AA%E0%B8%A3%E0%B8%B0(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%2066%20Sripanwa.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%8A%E0%B8%B2%E0%B8%8D%E0%B8%AD%E0%B8%B4%E0%B8%AA%E0%B8%AA%E0%B8%A3%E0%B8%B0%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ศรีพันวา (บริษัท ศรีพันวา แมเนจเมนท์ จำกัด)',
    expiry: 'Exp.28/02/2571',
    payorCode: '6700387001 บริษัท ศรีพันวา แมเนจเมนท์ จำกัด',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%2066%20Sripanwa.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%A7%E0%B8%B2%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ออร์คิดเดเซีย รีสอร์ท (บริษัท วุฒิธรรมาภรณ์ จำกัด)',
    expiry: 'Exp.28/02/2571',
    payorCode: '6700386001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Orchidacea%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Orchidacea%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Orchidacea%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม วิลล่า โซลิธูท รีสอร์ท แอนด์ สปา (บริษัท ไมตรี รีสอร์ท ดิเวลลอปเมนท์ จำกัด)',
    expiry: 'Exp.31/03/2571',
    payorCode: '6700930004',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Villas%20Zolitude%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Villas%20Zolitude%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Villas%20Zolitude%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เทราซอฟท์ โซลูชั่นส์ ดีเวลอปเม้นท์ จำกัด',
    expiry: 'Exp.31/12/2570',
    contact: 'เอกสารประกอบการวางบิล\nเอกสารประกอบการวางบิล\nPayor Code : 6700710001\nPayor Code : 6700710001',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%8B%E0%B8%AD%E0%B8%9F%E0%B8%97%E0%B9%8C%20%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B9%8C%20%E0%B8%94%E0%B8%B5%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
  },
  {
    label: 'บริษัท อาร์ ไอ เอส จำกัด',
    expiry: 'Exp.31/12/2570',
    contact: 'เอกสารประกอบการวางบิล\nเอกสารประกอบการวางบิล\nPayor Code : 6700807001\nPayor Code : 6700807001',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AD%E0%B8%B2%E0%B8%A3%E0%B9%8C%20%E0%B9%84%E0%B8%AD%20%E0%B9%80%E0%B8%AD%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
  },
  {
    label: 'บริษัท เซ็นทรัลเทรดดิ้ง จำกัด และบริษัทในเครือ',
    expiry: 'Exp.31/12/2570',
    contact: 'เอกสารประกอบการวางบิล\nเอกสารประกอบการวางบิล\nPayor Code : 6700775002 บจก. เซ็นทรัลเทรดดิ้ง\nPayor Code : 6780650047 บจก. ซีเทรคสากล\nPayor Code : 6780650048 บจก. เท็กซ์ทรัล เท็กซ์ไทลส์\nPayor Code : 6780650096 บจก. เอิร์ธแคร์\nPayor Code : 6700775002 บจก. เซ็นทรัลเทรดดิ้ง\nPayor Code : 6780650047 บจก. ซีเทรคสากล\nPayor Code : 6780650048 บจก. เท็กซ์ทรัล เท็กซ์ไทลส์\nPayor Code : 6780650096 บจก. เอิร์ธแคร์',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'รายชื่อกลุ่มบริษัทในเครือ',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2565)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'รายชื่อกลุ่มบริษัทในเครือ',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B9%89%E0%B8%87%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
  },
  {
    label: 'บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน) และบริษัทในเครือ',
    expiry: 'Exp.31/12/2570',
    contact: 'เอกสารประกอบการวางบิล\nเอกสารประกอบการวางบิล\nPayor Code : 6700707001 บมจ. เซ็นทรัล รีเทล คอร์ปอเรชั่น\nPayor Code : 6700762002 บจก. สรรพสินค้าเซ็นทรัล\nPayor Code : 6700434001 บจก. เซ็นทรัล ฟู้ด รีเทล (ท็อปส์)\nPayor Code : 6775570020 บจก. เซ็นทรัล ฟู้ด มินิมาร์เก็ต (แฟมิลี่มาร์ท)\nPayor Code : 6700472001 บจก. ซีอาร์ซี ไทวัสดุ\nPayor Code : 6780650044 บจก. บีทูเอส\nPayor Code : 6780650045 บจก. ห้างเซ็นทรัล ดีพาทเมนท์สโตร์\nPayor Code : 6780650046 บมจ. โรบินสัน\nPayor Code : 6780650049 บจก. ออฟฟิศเมท (ไทย)\nPayor Code : 6780650050 บจก. เพาเวอร์บาย\nPayor Code : 6780650051 บจก. ซี อาร์ ซี สปอร์ต (ซุปเปอร์ สปอร์ต)\nPayor Code : 6780650052 บจก. เดอะวันเซ็นทรัล\nPayor Code : 6780650058 บจก. เตียง จิราธิวัฒน์\nPayor Code : 6780650060 บจก. เซ็นทรัลทำ วิสาหกิจเพื่อสังคม\nPayor Code : 6780650061 บจก. เซ็นทรัล ฟู้ด โฮลเซลล์\nPayor Code : 6780650062 บจก. เซ็นทรัลแอมบาสซีโฮเต็ล\nPayor Code : 6780650063 บจก. เซ็นทรัล กรุ๊ป ออนไลน์\nPayor Code : 6780650064 บจก. เซ็นทรัล อินชัวรันส์ เซอร์วิสเซส\nPayor Code : 6780650065 บจก. เซ็นทรัลมาร์เก็ตติ้งกรุ๊ป อินเตอร์เทรด\nPayor Code : 6780650066 บจก. เซ็นทรัล และ มัทสึโมโตะ คิโยชิ\nPayor Code : 6780650067 บจก. เซ็นเนอร์จี อินโนเวชั่น\nPayor Code : 6780650068 บจก. เซ็นทรัล พีเพิล ดีเวลลอปเม้นท์ เซ็นเตอร์\nPayor Code : 6780650069 บจก. ฟิวเจอร์พลัส\nPayor Code : 6780650070 บจก. ไฮเท็คซ์ อินเตอร์แอคทีฟ\nPayor Code : 6780650071 บจก. ซี อาร์ ซี เพาเวอร์ รีเทล\nPayor Code : 6780650072 บมจ. เมพ คอร์ปอเรชั่น\nPayor Code : 6780650073 บจก. มูจิ รีเทล (ประเทศไทย)\nPayor Code : 6780650074 บมจ. ซีโอแอล\nPayor Code : 6780650075 บจก. ออฟฟิศเมท โลจิสติกส์\nPayor Code : 6780650076 บจก. ออฟฟิศเมท ออมนิแฟรนไชส์\nPayor Code : 6780650077 บจก. พีบี โลจิสติก\nPayor Code : 6780650078 บจก. เพลินฤดี\nPayor Code : 6780650079 บจก. ทรี พลัส บริการ\nPayor Code : 6780650080 บจก. ไทย วัตตส์\nPayor Code : 6780650081 บจก. เซ็นทรัลเพ็ทแอนด์มี\nPayor Code : 6780650095 บจก. ขริงขริง\nPayor Code : 6700707001 บมจ. เซ็นทรัล รีเทล คอร์ปอเรชั่น\nPayor Code : 6700762002 บจก. สรรพสินค้าเซ็นทรัล\nPayor Code : 6700434001 บจก. เซ็นทรัล ฟู้ด รีเทล (ท็อปส์)\nPayor Code : 6775570020 บจก. เซ็นทรัล ฟู้ด มินิมาร์เก็ต (แฟมิลี่มาร์ท)\nPayor Code : 6700472001 บจก. ซีอาร์ซี ไทวัสดุ\nPayor Code : 6780650044 บจก. บีทูเอส\nPayor Code : 6780650045 บจก. ห้างเซ็นทรัล ดีพาทเมนท์สโตร์\nPayor Code : 6780650046 บมจ. โรบินสัน\nPayor Code : 6780650049 บจก. ออฟฟิศเมท (ไทย)\nPayor Code : 6780650050 บจก. เพาเวอร์บาย\nPayor Code : 6780650051 บจก. ซี อาร์ ซี สปอร์ต (ซุปเปอร์ สปอร์ต)\nPayor Code : 6780650052 บจก. เดอะวันเซ็นทรัล\nPayor Code : 6780650058 บจก. เตียง จิราธิวัฒน์\nPayor Code : 6780650060 บจก. เซ็นทรัลทำ วิสาหกิจเพื่อสังคม\nPayor Code : 6780650061 บจก. เซ็นทรัล ฟู้ด โฮลเซลล์\nPayor Code : 6780650062 บจก. เซ็นทรัลแอมบาสซีโฮเต็ล\nPayor Code : 6780650063 บจก. เซ็นทรัล กรุ๊ป ออนไลน์\nPayor Code : 6780650064 บจก. เซ็นทรัล อินชัวรันส์ เซอร์วิสเซส\nPayor Code : 6780650065 บจก. เซ็นทรัลมาร์เก็ตติ้งกรุ๊ป อินเตอร์เทรด\nPayor Code : 6780650066 บจก. เซ็นทรัล และ มัทสึโมโตะ คิโยชิ\nPayor Code : 6780650067 บจก. เซ็นเนอร์จี อินโนเวชั่น\nPayor Code : 6780650068 บจก. เซ็นทรัล พีเพิล ดีเวลลอปเม้นท์ เซ็นเตอร์\nPayor Code : 6780650069 บจก. ฟิวเจอร์พลัส\nPayor Code : 6780650070 บจก. ไฮเท็คซ์ อินเตอร์แอคทีฟ\nPayor Code : 6780650071 บจก. ซี อาร์ ซี เพาเวอร์ รีเทล\nPayor Code : 6780650072 บมจ. เมพ คอร์ปอเรชั่น\nPayor Code : 6780650073 บจก. มูจิ รีเทล (ประเทศไทย)\nPayor Code : 6780650074 บมจ. ซีโอแอล\nPayor Code : 6780650075 บจก. ออฟฟิศเมท โลจิสติกส์\nPayor Code : 6780650076 บจก. ออฟฟิศเมท ออมนิแฟรนไชส์\nPayor Code : 6780650077 บจก. พีบี โลจิสติก\nPayor Code : 6780650078 บจก. เพลินฤดี\nPayor Code : 6780650079 บจก. ทรี พลัส บริการ\nPayor Code : 6780650080 บจก. ไทย วัตตส์\nPayor Code : 6780650081 บจก. เซ็นทรัลเพ็ทแอนด์มี\nPayor Code : 6780650095 บจก. ขริงขริง',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2566)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'รายชื่อกลุ่มบริษัทในเครือ',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99)%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%20%E0%B8%93%2029.05.2566.pdf',
      },
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570)%20%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20(2566)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'แบบฟอร์มเอกสารใบส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/New%20Patient%20Transfer%20Patient%20_Update.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B8%A1%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%201%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99).pdf',
      },
      {
        label: 'รายชื่อกลุ่มบริษัทในเครือ',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%A5%20%E0%B8%84%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94(%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%8A%E0%B8%99)%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%20%E0%B8%93%2029.05.2566.pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน และ สำเนาบัตรพนักงาน',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
  },
  {
    label: 'บริษัท สรรพสินค้าเซ็นทรัล จำกัด (สาขาป่าตอง) (สาขาที่ 00055) (เฉพาะลูกค้า)',
    expiry: 'Exp.31/05/2571',
    payorCode: '6700762002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท สรรพสินค้าเซ็นทรัล จำกัด (สาขาภูเก็ต) (สาขาที่ 00028) (เฉพาะลูกค้า)',
    expiry: 'Exp.31/05/2571',
    payorCode: '6700762002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เลิฟ ไอแลนด์ จำกัด (เลิฟ อันดามัน)',
    expiry: 'Exp.29/02/2571',
    payorCode: '6700441001',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20(2566-2571)%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%9F%20%E0%B9%84%E0%B8%AD%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20(2566-2571)%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%9F%20%E0%B9%84%E0%B8%AD%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2571)%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%9F%20%E0%B9%84%E0%B8%AD%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C.pdf',
      },
    ],
  },
  {
    label: 'บริษัท คาร์นิวัลเมจิก จำกัด',
    expiry: 'Exp.31/01/2571',
    payorCode: '6780650030',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%88%E0%B8%B4%E0%B8%81%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%88%E0%B8%B4%E0%B8%81%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%88%E0%B8%B4%E0%B8%81%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ตแฟนตาซี จำกัด (มหาชน)',
    expiry: 'Exp.31/05/2571',
    payorCode: '6700500001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%81%E0%B8%9F%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%8B%E0%B8%B5%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%81%E0%B8%9F%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%8B%E0%B8%B5%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%81%E0%B8%9F%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%8B%E0%B8%B5%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน) (TOT)',
    expiry: 'Exp.31/01/2571',
    payorCode: '6702317001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%84%E0%B8%A1%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%84%E0%B8%A1%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A1%E0%B8%88.%20%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%84%E0%B8%A1%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4(2566-2571).pdf',
      },
      {
        label: 'เอกสารประกอบการเบิก',
        href: 'http://10.161.11.22/images/uploads/marketing/RefTOT.pdf',
      },
    ],
  },
  {
    label: 'บริษัท เซ้าท์เซอร์วิสเซส (ไทยแลนด์) จำกัด',
    expiry: 'Exp.28/02/2571',
    payorCode: '6700435001',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B9%80%E0%B8%8B%E0%B8%AA%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B9%80%E0%B8%8B%E0%B8%AA%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B9%80%E0%B8%8B%E0%B8%AA%20(%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%94%E0%B9%8C)%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
  },
  {
    label: 'บริษัท ภูเก็ตชิปปิ้งเซอร์วิสส์ จำกัด',
    expiry: 'Exp.28/02/2571',
    payorCode: '6700491001',
    contact: 'เอกสารประกอบการวางบิล',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%8A%E0%B8%B4%E0%B8%9B%E0%B8%9B%E0%B8%B4%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B8%AA%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AD%E0%B8%B1%E0%B8%9E%E0%B9%80%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%8A%E0%B8%B4%E0%B8%9B%E0%B8%9B%E0%B8%B4%E0%B9%89%E0%B8%87.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%8A%E0%B8%B4%E0%B8%9B%E0%B8%9B%E0%B8%B4%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%AA%E0%B8%AA%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: '- ใบส่งตัว',
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
  },
  {
    label: 'บริษัท ทีเอสแอล แน็กซ์โก้ (ประเทศไทย) (สำนักงานใหญ่) จำกัด',
    expiry: 'Exp.31/12/2571',
    payorCode: '6775860003',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%97%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%81%E0%B8%AD%E0%B8%A5%20%E0%B9%81%E0%B8%99%E0%B9%87%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%82%E0%B8%81%E0%B9%89%20(%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)%20(2567-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%97%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%81%E0%B8%AD%E0%B8%A5%20%E0%B9%81%E0%B8%99%E0%B9%87%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%82%E0%B8%81%E0%B9%89%20(%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)%20(2567-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%97%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%81%E0%B8%AD%E0%B8%A5%20%E0%B9%81%E0%B8%99%E0%B9%87%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%82%E0%B8%81%E0%B9%89%20(%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)%20(2567-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม อนันตรา เวเคชั่น คลับ ไม้ขาว ภูเก็ต (บริษัท สมุย บีช คลับ โอนเนอร์ จำกัด) (สาขาที่ 00003)',
    expiry: 'Exp.31/12/2570',
    payorCode: '6700495001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20Anantara%20Vacation.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Agreement%20Anantara%20Vacation.pdf',
      },
    ],
  },
  {
    label: 'บริษัท เอ็ม บี เค รีสอร์ท จำกัด (มหาชน) (สาขาที่ 00001 สนามกอล์ฟ ล็อค ปาล์ม กอล์ฟ คลับ) และ (สาขาที่ 00002 สนามกอล์ฟ เรด เมาท์เทิน กอล์ฟ คลับ)',
    expiry: 'Exp.31/03/2571',
    payorCode: '6700103001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20MBK%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/MBK-R%20%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%99%E0%B8%9A%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A2%202%20%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%A5%E0%B8%87%E0%B8%99%E0%B8%B2%E0%B8%A1%20Update%206-6-2567.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20MBK%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีพี แอ็กซ์ตร้า จำกัด (มหาชน) (สาขาที่่ 00193) (โลตัส ภูเก็ต)',
    expiry: 'Exp.31/12/2570',
    payorCode: '6700430001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Lotus%20Phuket%20(2566-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Lotus%20Phuket%20(2566-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Lotus%20Phuket%20(2566-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ภูเก็ต แมริออท รีสอร์ท แอนด์ สปา เมอร์ลินบีช (บริษัท เมอร์ลินบีช จำกัด) (สาขาที่่ 00001)',
    expiry: 'Exp.30/11/2570',
    payorCode: '6700279005',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Phuket%20Marriott%20Merlin%20(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Phuket%20Marriott%20Merlin%20(2565-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Phuket%20Marriott%20Merlin%20(2565-2570)%20-%20Copy.pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีพี แอ็กซ์ตร้า จำกัด (มหาชน) (สาขาที่่ 00063) (แม็คโครราไวย์)',
    expiry: 'Exp.31/01/2571',
    payorCode: '6700430001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Rawai(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Makro%20Rawai%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Rawai%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท จีเอ็ม เวนเจอร์ จำกัด',
    expiry: 'Exp.30/9/2570',
    payorCode: '6700744001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20(2565-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%88%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%20%E0%B9%80%E0%B8%A7%E0%B8%99%E0%B9%80%E0%B8%88%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20(2565-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%88%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%20%E0%B9%80%E0%B8%A7%E0%B8%99%E0%B9%80%E0%B8%88%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20(2565-2570)%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%88%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%20%E0%B9%80%E0%B8%A7%E0%B8%99%E0%B9%80%E0%B8%88%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
    ],
  },
  {
    label: 'บริษัท อะ ลิตเติ้ล คลับ จำกัด',
    expiry: 'Exp.31/08/2570',
    payorCode: '6700785001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AD%E0%B8%B0%20%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%A5%20%E0%B8%84%E0%B8%A5%E0%B8%B1%E0%B8%9A%20(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AD%E0%B8%B0%20%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%A5%20%E0%B8%84%E0%B8%A5%E0%B8%B1%E0%B8%9A.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Contract%20%E0%B8%9A%E0%B8%88%E0%B8%81.%20%E0%B8%AD%E0%B8%B0%20%E0%B8%A5%E0%B8%B4%E0%B9%80%E0%B8%95%E0%B8%B4%E0%B9%89%E0%B8%A5%20%E0%B8%84%E0%B8%A5%E0%B8%B1%E0%B8%9A.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม โดม รีสอร์ท (บริษัท โดม รีสอร์ท จำกัด)',
    expiry: 'Exp.31/08/2570',
    payorCode: '6700776002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%82%E0%B8%94%E0%B8%A1%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%82%E0%B8%94%E0%B8%A1%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Contract%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%82%E0%B8%94%E0%B8%A1%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ป่าตอง พารากอน รีสอร์ท แอนด์ สปา (บริษัท ป่าตอง พารากอน จำกัด)',
    expiry: 'Exp.30/06/2570',
    payorCode: '6700363001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Patong%20Paragon(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Patong%20Paragon(2565-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Patong%20Paragon(2565-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม อนันตรา ไม้ขาว ภูเก็ต วิลล่าส์ (บริษัท เอ็มเอช ไทย แมเนจเม้นท์ จำกัด)',
    expiry: 'Exp.30/04/2574',
    payorCode: '6775860026',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2569-2574).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20MH%20Thai.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2569-2574).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีพี แอ็กซ์ตร้า จำกัด (มหาชน) (สาขาที่ 00076) (แม็คโครถลาง)',
    expiry: 'Exp.31/08/2570',
    payorCode: '6700430001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/SignatureSiamMacroTalang.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Contract%20SiamMacroTalang.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ภูเก็ต แมริออท รีสอร์ท แอนด์ สปา ในยางบีช (บริษัท ทีซีซี ลักซ์ชูรีโฮเทลส์ และ รีสอร์ท จำกัด)',
    expiry: 'Exp.31/10/2573',
    payorCode: '6767008058',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Detail(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Agreement%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงเรียนนานาชาติ บริติช ภูเก็ต (ฺBritish International School Phuket)',
    expiry: 'Exp.31/10/2573',
    payorCode: '6700361001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/Detail(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature%20British.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Agreement(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'บริษัท โฮม โปรดักส์ เซ็นเตอร์ จำกัด (มหาชน) (สาขาฉลอง) (สาขาที่ 00039)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6700584001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Home%20Pro%20%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Home%20Pro%20%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87(2565-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Home%20Pro%20%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87(2565-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท โฮม โปรดักส์ เซ็นเตอร์ จำกัด (มหาชน) (สาขาภูเก็ต) (สาขาที่ 00012)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6700584001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Home%20Pro%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Home%20Pro%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95(2565-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Home%20Pro%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95(2565-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีพี แอ็กซ์ตร้า จำกัด (มหาชน) (สาขาที่่ 00072) (แม็คโครป่าตอง)',
    expiry: 'Exp.31/03/2571',
    payorCode: '6700430001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Patong(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Makro%20Patong(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Patong(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ซีพี แอ็กซ์ตร้า จำกัด (มหาชน) (สาขาที่่ 00028) (แม็คโครภูเก็ต)',
    expiry: 'Exp.31/07/2570',
    payorCode: '6700430001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Phuket(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Makro%20Phuket%20(2565-2570).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Makro%20Phuket%20(2565-2570).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ภูเก็ตสแควร์ จำกัด (ศูนย์การค้าจังซีลอน)',
    expiry: 'Exp.31/7/2573',
    payorCode: '6700506001',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Jungcelon%20(2568-2573).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Jungcelon.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Jungcelon%20(2568-2573).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะ พาวิลเลี่ยน ภูเก็ต (บริษัท แอลเอส พาวิลเลี่ยน ดีเวลลอปเมนท์ จำกัด)',
    expiry: 'Exp.30/11/2570',
    payorCode: '6700335001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Detail(2568-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20LS%20Pavilien.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Agreement%20LS%20Pavilion2025-2027.pdf',
      },
    ],
  },
  {
    label: 'บริษัท มาสเตอรี่ภูเก็ต จำกัด',
    expiry: 'Exp.31/10/2571',
    payorCode: '6700864002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Mastery%20(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Mastery%20(2566-2571).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Mastery%20(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ซิกซ์เซ้นเซส ยาวน้อย รีสอร์ท (บริษัท ซัสเทนเนเบิ้ล ลัคชัวรี ฮอสพิทัลลิตี (ไทยแลนด์)',
    expiry: 'Exp.31/03/2572',
    payorCode: '6700279009',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572)%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%8B%E0%B8%B4%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AA%20%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Signature%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%8B%E0%B8%B4%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AA%20%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2567-2572)%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%8B%E0%B8%B4%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%80%E0%B8%8B%E0%B9%89%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AA%20%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม พูลแมน ภูเก็ต พันวา บีช รีสอร์ท แอนด์ สปา (บริษัท พันวาบีช พรอพเพอร์ตี้ส์ จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.30/04/2572',
    payorCode: '6767008052',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Pullan%20Panwa%20(2567-2572).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Sign%20Pullman%20Panwa%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Pullman%20Panwa%20(2567-2572).pdf',
      },
    ],
  },
  {
    label: 'บริษัท ปูนซิเมนต์ไทย จำกัด (มหาชน) และบริษัทในเครือซิเมนต์ไทย',
    expiry: 'Exp.31/12/2570',
    contact: 'เอกสารประกอบการวางบิล\nเอกสารประกอบการวางบิล\nPayor Code : 6700465001\nPayor Code : 6700465001',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20(2567-2570).pdf',
      },
      {
        label: 'ตัวอย่างหนังสือส่งตัวและบัตรพนักงาน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20SCG.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20(2567-2570).pdf',
      },
      {
        label: 'รายชื่อบริษัทในเครือ',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20Update%2024.08.2023.xls',
      },
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20(2567-2570).pdf',
      },
      {
        label: 'ตัวอย่างหนังสือส่งตัวและบัตรพนักงาน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20SCG.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20(2567-2570).pdf',
      },
      {
        label: 'รายชื่อบริษัทในเครือ',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B9%84%E0%B8%97%E0%B8%A2%20Update%2024.08.2023.xls',
      },
    ],
  },
  {
    label: '- สำเนาบัตรประชาชน / Passport',
  },
  {
    label: '- ใบรับรองแพทย์ / ใบเคลม',
  },
  {
    label: '- รายละเอียดค่ารักษาพยาบาล',
    contact: 'กรณีมีปัญหาติดต่อ คุณจันทิมา เตี๋ยวสกุล (ขวัญ) โทรศัพท์ 081-5379899\nQR Code ตรวจสอบสิทธิ์โครงการ OPD ไม่ต้องจ่ายเงิน และ IPD ไม่ต้องใช้ใบส่งตัว',
    docs: [
      {
        label: 'รายชื่อบริษัทที่เข้าร่วมโครงการ OPD และ IPD ไม่ต้องสำรองจ่าย และ ไม่ต้องใช้ใบส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%20OPD%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%20%E0%B9%81%E0%B8%A5%E0%B8%B0%20IPD%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7.xls',
      },
      {
        label: 'รายชื่อพนักงาน South Chain โครงการ OPD และ IPD ไม่ต้องสำรองจ่าย และ ไม่ต้องใช้ใบส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%20South%20Chain%20%E0%B9%83%E0%B8%99%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%20OPD%20%E0%B9%81%E0%B8%A5%E0%B8%B0%20IPD%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%B3%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%20%E0%B9%81%E0%B8%A5%E0%B8%B0%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20(%E0%B8%AD%E0%B8%B1%E0%B8%9E%E0%B9%80%E0%B8%94%E0%B8%97%201%20%E0%B8%AA.%E0%B8%84.2563).xls',
      },
      {
        label: 'ขั้นตอนโครงการ OPD และ IPD ไม่ต้องสำรองจ่าย และ ไม่ต้องใช้ใบส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%20OPD%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%20%E0%B9%81%E0%B8%A5%E0%B8%B0%20IPD%20%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7.pdf',
      },
      {
        label: 'https://azhrappap01.azurewebsites.net/account/hospitallogin',
        href: 'https://azhrappap01.azurewebsites.net/account/hospitallogin',
      },
    ],
  },
  {
    label: 'บริษัท สิงคโปร์แอร์ไลน์ส จำกัด No Expiry Date',
    payorCode: '6700471001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Memo%20&%20%E0%B8%88%E0%B8%94%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/Silk%20Air%20Signature%20.pdf',
      },
      {
        label: 'รายชื่อพนักงาน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%84%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%8C%E0%B9%81%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C%E0%B8%AA%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'ตัวอย่างบัตรพนักงาน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม พราว ภูเก็ต (บริษัท สุวัฒน์นภา จำกัด)',
    expiry: 'Exp.30/04/2571',
    payorCode: '6700279003',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2571).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%A7%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20(%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%AA%E0%B8%B8%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C%E0%B8%99%E0%B8%A0%E0%B8%B2%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2(2566-2571).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เอ็นเอช โบ๊ท ลากูน ภูเก็ต รีสอร์ต (บริษัท ภูเก็ต โบ๊ทลากูน จำกัด)',
    expiry: 'Exp.31/03/2571',
    payorCode: '6700502001',
    contact: 'กรณีมีปัญหาติดต่อ คุณธารฤปภา โชตะวัน (ตั๊ก) โทรศัพท์ 093-6392224',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Memo%20-%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Sign%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Contract%20-%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B9%82%E0%B8%9A%E0%B9%8A%E0%B8%97%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%B9%E0%B8%99%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94).pdf',
      },
    ],
  },
  {
    label: 'บริษัท เดอะไลฟ์โค (ไทยแลนด์) จำกัด)',
    expiry: 'Exp.31/01/2571',
    payorCode: '6700279002',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Summary(2566-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Agreement.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เคป พันวา ภูเก็ต (บริษัท เกษมกิจ จำกัด) (สาขาที่ 00001)',
    expiry: 'Exp.31/01/2570',
    payorCode: '6700766002',
    contact: 'กรณีมีปัญหาติดต่อ คุณอุสาห์ มหาชัยชนะ (อุ๊) โทรศัพท์ 092 - 6543255',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Cape%20Panwa%20(2567-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Update%20Sign%20Cape%20Panwa%202568.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20Cape%20Panwa%20(2567-2570).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม อนันตรา ลายัน ภูเก็ต รีสอร์ท (บริษัท เอ็มเอชจี ภูเก็ต จำกัด)',
    expiry: 'Exp.30/09/2570',
    payorCode: '6700723001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%AD%E0%B8%99%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B2%20%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%B1%E0%B8%99%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(2565-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Signature%20Anantara%20Layan.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B8%AD%E0%B8%99%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B2%20%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%B1%E0%B8%99%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%97%20(%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%E0%B9%80%E0%B8%AD%E0%B8%8A%E0%B8%88%E0%B8%B5%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94).pdf',
      },
    ],
  },
  {
    label: 'โรงแรม ภารีสา รีสอร์ท ภูเก็ต (บริษัท ภารีสา คอร์ปอเรชั่น จำกัด)',
    expiry: 'Exp.31/03/2569',
    payorCode: '6700369001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%9B%E0%B8%B0%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%20%E0%B8%A0%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%B2.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%20%E0%B8%A0%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%B2.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%A0%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B8%B2.pdf',
      },
    ],
  },
  {
    label: 'บริษัท วิทยุการบินแห่งประเทศไทย จำกัด No Expiry Date',
    payorCode: '6700255001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Detail%20Aero%20Thai%20(2567-2572)%20(1).pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/Agreement%20Aere%20Thai%20(2567-2572).pdf',
      },
      {
        label: 'เอกสารประกอบการเบิก',
        href: 'http://10.161.11.22/images/uploads/marketing/RefAERO.pdf',
      },
      {
        label: 'ตัวอย่างบัตรครอบครัวพนักงาน',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%20OPD%20%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B8%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%B4%E0%B8%99.pdf',
      },
    ],
  },
  {
    label: 'บริษัท ท่าอากาศยานไทย จำกัด (มหาชน) No Expiry Date',
    payorCode: '6703079001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'ตัวอย่างบัตรพนักงาน (อัพเดท 25/10/2565)',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9E%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%20AOT%20%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A7%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%B4%E0%B8%A5.jpg',
      },
      {
        label: 'เอกสารสัญญ',
        href: 'http://10.161.11.22/images/uploads/marketing/ContractAOT.pdf',
      },
      {
        label: 'รายชื่อพนักงาน (อัพเดท 16/07/2569)',
        href: 'http://10.161.11.22/images/uploads/marketing/Namelist%2016July69.xlsx',
      },
      {
        label: 'รายชื่อผู้เกษียณ (อัพเดท 08/09/2568)',
        href: 'http://10.161.11.22/images/uploads/marketing/Retriment2025.pdf',
      },
      {
        label: 'เงื่อนไขความคุ้มครอง (อัพเดท 1/07/2563)',
        href: 'http://10.161.11.22/images/uploads/marketing/AOT%20%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%81%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%8C%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%81%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%9A%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5.pdf',
      },
      {
        label: 'หลักเกณฑ์การเบิกจ่ายค่ารักษาพยาบาล (อัพเดท 15/07/2567)',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%81%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%81%E0%B8%88%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%AD%E0%B8%97.pdf',
      },
      {
        label: 'หลักเกณฑ์การใช้สิทธิ์โรคCovid - 19 (อัพเดท 13/09/2565)',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%81%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%8C%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%82%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%9419.pdf',
      },
      {
        label: 'รหัสโรค',
        href: 'http://10.161.11.22/images/uploads/marketing/AOT%20%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA%E0%B9%82%E0%B8%A3%E0%B8%84.xlsx',
      },
    ],
  },
  {
    label: 'บริษัท การบินไทย จำกัด (มหาชน) (ระงับเครดิตชั่วคราวตั้งแต่วันที่ 22 พฤษภาคม 2563 เป็นต้นไป)',
    payorCode: '6700460001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/SKMBT_C22015052708170.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/SKMBT_C22015052608570.pdf',
      },
      {
        label: 'เอกสารประกอบการเบิก',
        href: 'http://10.161.11.22/images/uploads/marketing/RefAWAY.pdf',
      },
    ],
  },
  {
    label: 'บริษัท เฮดสตาร์ท เอดดูเคชั่น เซนเตอร์ จำกัด (โรงเรียนนานาชาติเฮดสตาร์ท)',
    payorCode: '6700718002',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/Memo%20HDSK.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/SignHEAD.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/ContractHEAD.pdf',
      },
    ],
  },
  {
    label: 'สำนักงานกองทุนสงเคราะห์การทำสวนยาง',
    docs: [
      {
        label: 'รายชื่อพนักงานและลูกจ้างที่ไม่มีสิทธิ์รับการช่วยเหลือค่ารักษาพยาบาล',
        href: 'http://10.161.11.22/images/uploads/marketing/SKMBT_C22014112510390.pdf',
      },
      {
        label: 'รายชื่อพนักงานและลูกจ้างที่มีสิทธิ์รับการช่วยเหลือค่ารักษาพยาบาล จ.ภูเก็ต',
        href: 'http://10.161.11.22/images/uploads/marketing/SKMBT_C22015021009190.pdf',
      },
    ],
  },
  {
    label: 'โรงแรม เดอะ นาคา ภูเก็ต (บริษัท เอส.ที.พี.กรุ๊ป แมเนจเม้นท์ จำกัด)',
    expiry: 'Exp.31/01/2569',
    payorCode: '6700985001',
    contact: 'กรณีมีปัญหาติดต่อ คุณชุติกาญจน์ คิดชอบ (ออน) โทรศัพท์ 089 - 9085293',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9B%E0%B8%B0%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%B2.pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%8C%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%B2.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%B2.pdf',
      },
    ],
  },
  {
    label: 'บริษัท นิกรมารีน จำกัด (สำนักงานใหญ่)',
    expiry: 'Exp.28/02/2570',
    payorCode: '6780650188',
    contact: 'กรณีมีปัญหาติดต่อ คุณพรรณกร หนักแน่น (พันช์) โทรศัพท์ 064-9282228',
    docs: [
      {
        label: 'รายละเอียด',
        href: 'http://10.161.11.22/Images/Uploads/Marketing/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99(2569-2570).pdf',
      },
      {
        label: 'ลายเซ็นผู้มีอำนาจส่งตัว',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99.pdf',
      },
      {
        label: 'เอกสารสัญญา',
        href: 'http://10.161.11.22/images/uploads/marketing/%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9A%E0%B8%88%E0%B8%81.%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99(2569-2570).pdf',
      },
      {
        label: 'ตารางทำงานแพทย์',
        href: 'http://10.161.11.12:915/Views/doctorSchedule.aspx?site_code=067',
      },
      {
        label: 'ตารางแพทย์ Consult',
        href: 'http://10.161.11.12:915/Views/consultSchedule.aspx?site_code=067',
      },
      {
        label: 'ตารางเวร GP นอกเวลา / ICU',
        href: 'http://10.161.11.12:915/Views/gpNightSchedule.aspx?site_code=067',
      },
      {
        label: 'OUR DOCTOR',
        href: 'https://epms.bdms.co.th/search/?type=default',
      },
      {
        label: 'เลขที่ใบอนุญาต-ตัวอย่างลายเซ็นแพทย์',
        href: 'http://10.161.11.22/index.php/2013-05-02-02-56-40',
      },
      {
        label: 'ตารางสลายนิ่ว',
        href: 'http://10.161.11.22/images/uploads/Doctor/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%A7.pdf',
      },
      {
        label: 'คู่มือแนวทางการกำหนดค่าธรรมเนียมแพทย์ พ.ศ. 2563',
        href: 'http://10.161.11.22/images/uploads/Doctor/%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B9%81%E0%B8%99%E0%B8%A7%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%20%E0%B8%9E.%E0%B8%A8.%202563%20(1)%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%AA%E0%B8%B8%E0%B8%94.pdf',
      },
      {
        label: 'ตารางแพทย์ Consult สำรอง',
        href: 'https://bdmsgroup-my.sharepoint.com/:x:/g/personal/peerapat_ch_bdms_co_th/EVJKmbnxoN5PptRSX9Auq4wBmTprkWafF4qVdug4l5EGvg?e=dOyqX7',
      },
      {
        label: 'Acute pain Service',
        href: 'http://10.161.11.22/images/uploads/Doctor/Acute%20pain%20Service.pdf',
      },
      {
        label: 'ตารางทำงานแพทย์ (สำรอง)',
        href: 'https://bdmsgroup-my.sharepoint.com/:x:/g/personal/peerapat_ch_bdms_co_th/ESBKqdxkfiVHjKVNwiQSAUwBBEFlbcex510hwr3tnVvlQA?e=JL7cht',
      },
      {
        label: 'Document Management',
        href: 'http://10.161.10.35/',
      },
      {
        label: 'Print Form',
        href: 'http://10.161.10.50/print-form/login.aspx',
      },
      {
        label: 'Occurrence Online',
        href: 'https://occurrence.bdms.co.th/?bu=BSI',
      },
      {
        label: 'บัญชีรายชื่อบริษัทคู่สัญญา',
        href: 'http://10.161.11.22/images/uploads/Marketing/%E0%B8%9A%E0%B8%B1%E0%B8%8D%E0%B8%8A%E0%B8%B5%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%9B%E0%B8%B5%202569%20(BSI).xls',
      },
      {
        label: 'รายชื่อรักษาพยาบาล',
        href: 'http://10.161.11.22/index.php/2012-08-23-02-05-42-1',
      },
      {
        label: 'รายชื่อคลินิคพยาบาล',
        href: 'http://10.161.11.22/index.php/listclinehead',
      },
      {
        label: 'รายชื่อตรวจสุขภาพก่อนเข้าทำงาน',
        href: 'http://10.161.11.22/index.php/centara-grand-beach-resort-phuket',
      },
      {
        label: 'รายชื่อตรวจสุขภาพประจำปี',
        href: 'http://10.161.11.22/index.php/chrysalis-estate',
      },
      {
        label: 'โปรแกรมบริหารจัดการคะแนนตัวแทนประกัน',
        href: 'http://10.161.11.12:910/Pages/LoginPage.aspx',
      },
      {
        label: 'รายชื่อบริษัทประกัน',
        href: 'http://10.161.11.22/images/uploads/Marketing/insurance.mht',
      },
      {
        label: 'รายชื่อตรวจสุขภาพก่อนทำประกัน',
        href: 'http://10.161.11.22/index.php/2016-12-09-03-33-03',
      },
      {
        label: 'รายชื่อประกันกลุ่มโรงเรียน',
        href: 'http://10.161.11.22/index.php/the-royal-phuket-yacht-club',
      },
      {
        label: 'Foreign insurance companies',
        href: 'http://10.161.11.22/images/uploads/IT/Interins.mht',
      },
      {
        label: 'Upload File',
        href: 'http://10.161.11.22/index.php/upload-file',
      },
    ],
  },
  {
    label: 'Phuket International Hospital',
  },
  {
    label: '44 Chalermprakiat Ror 9 Rd Phuket 83000 Tel: +66 76 249-400, +66 76 361 818 Fax: +66 76 210 936',
  },
