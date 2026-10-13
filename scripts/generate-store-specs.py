import json,html,re
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("SMG", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("SMGBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
rows=json.loads(Path('tmp/pdfs/store-spec-data.json').read_text())
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='SMGTitle',fontSize=19,leading=23,textColor=colors.HexColor('#12334b'),spaceAfter=18));styles['BodyText'].fontName='SMG';styles['SMGTitle'].fontName='SMG';styles['Heading2'].fontName='SMGBold';styles['BodyText'].fontSize=9;styles['BodyText'].leading=13
styles['Heading2'].fontSize=12;styles['Heading2'].leading=16
clean=lambda t:html.escape(str(t).replace('—','-').replace('–','-').replace('µ','u'))
def para(t,style='BodyText'):return Paragraph(clean(t),styles[style])
for p in rows:
 path=Path('public/specifications')/(p['slug']+'.pdf')
 doc=SimpleDocTemplate(str(path),pagesize=(612,792),rightMargin=44,leftMargin=44,topMargin=42,bottomMargin=40)
 story=[para('STEPHENS MOLECULAR GROUP','Heading2'),para(p['title'],'SMGTitle'),para('Product specification summary | Revision: 2026-10-12'),Spacer(1,14)]
 data=[['SMG SKU',p['sku']],['Supplier SKU',p.get('supplierSku','Request supplier matching')],['Category',p['category']],['Pack contents',p['packLabel']+' per '+p['orderUnit']],['Minimum quantity',str(p['minCases'])+' '+p['orderUnitPlural']+' / '+format(p['minCases']*p['unitsPerCase'],',')+' '+p['pieceLabel']],['Price per pack',f"${p['price']:,.2f} (provisional)"],['Price per piece','Awaiting packaging confirmation' if p['quoteOnly'] else (f"${p['price']/p['unitsPerCase']:,.4f}" if p['price']/p['unitsPerCase'] < 1 else f"${p['price']/p['unitsPerCase']:,.2f}")],['Minimum product total','Quote required' if p['quoteOnly'] else f"${p['price']*p['minCases']:,.2f}"]]
 tab=Table([[para(k),para(v)] for k,v in data],colWidths=[150,374]);tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#f1f6f8')),('VALIGN',(0,0),(-1,-1),'TOP'),('BOTTOMPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7)]));story +=[tab,Spacer(1,14),para('Technical details','Heading2')]
 for k,v in p['technical'].items():story += [para(k.capitalize()+': '+v),Spacer(1,5)]
 story += [para('Compatibility','Heading2'),para(p['compatibility']),Spacer(1,10),para('Ordering & fulfillment','Heading2'),para(p['freightNote']),para('Estimated overseas lead time: 6-7 weeks. Schedule and start date are confirmed with the written order. For laboratory use only. This summary is not a lot certificate or a dimensional drawing.'),Spacer(1,12),para('Contact: dustin@stephensmolecular.com | stephensmolecular.com/shop')]
 if p['quoteOnly']:story += [para('Packaging must be confirmed before purchase.')]
 doc.build(story)
 assert len(PdfReader(path).pages)==1,path
print('Generated and checked 29 one-page product PDFs.')
