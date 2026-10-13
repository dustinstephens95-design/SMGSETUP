import type { StoreProduct } from "./store-products";
export const freightNote = "Listed prices include a provisional allowance for overseas freight to the delivery address in your quote. Final delivered pricing depends on the destination, order mix and shipment date and must be confirmed in your written quote. Applicable taxes are additional.";
export function compatibilityGuidance(p: StoreProduct): string {
  if (p.supplierSku?.includes("-H-")) return "Supplier catalog lists Hamilton STAR, STARlet and Nimbus for this tip family (catalog p. 9). Confirm the instrument head, rack/carrier and protocol for your exact SKU before ordering. This is supplier-reported compatibility, not an independent SMG instrument validation.";
  if (p.supplierSku?.includes("-B-")) return "Supplier catalog lists Beckman Biomek i5, i7, FX and NX for this tip family (catalog p. 10). Confirm the instrument head, rack/carrier and protocol for your exact SKU before ordering. This is supplier-reported compatibility, not an independent SMG instrument validation.";
  if (p.supplierSku === "CRPC04-3-TP-FS") return "Supplier table marks the transparent full-skirt 40 uL 384-well plate family for QuantStudio 5, QuantStudio 6 Pro, QuantStudio 7 Pro, Bio-Rad CFX384 and Roche LightCycler 480, among other systems. Use the matching 384-well block and confirm protocol/optical requirements. Supplier-reported fit is not an independent SMG validation.";
  if (p.supplierSku === "CRDP22-SV-9") return "The supplier listing describes use with KingFisher Flex 96 Deep-Well Head and MagMAX Express-96 Deep-Well systems. Match the 96 deep-well head and your extraction protocol before ordering; supplier-reported fit does not establish performance for every assay.";
  if (p.supplierSku === "CRCM-TC-96") return "Supplier catalog p. 27 pairs this 96-position V-bottom comb with 2.2 mL 96-square-well plates. Confirm the instrument head and protocol; the catalog does not establish universal fit on all magnetic extraction systems.";
  if (p.category === "Robotic Pipette Tips") return `Supplier guidance indicates compatibility with many ${p.title.startsWith("Hamilton") ? "Hamilton" : "Beckman"} liquid-handling models. This is product-family guidance, not confirmation for every instrument. Send your instrument model, head, tip carrier and protocol to SMG for SKU-specific confirmation before ordering.`;
  if (p.supplierSku === "CRPC-SF-S") return "The supplier describes this film as suitable for optical qPCR. Confirm optical channel, plate surface, sealing method and instrument requirements for your application.";
  if (p.supplierSku === "CRDP-SC-9") return "Supplier catalog p. 74 identifies CRDP-SC-9 as a 96-square-well silicone mat; supplier correspondence indicates fit with the listed deep-well plates. Confirm the exact plate SKU, well geometry and fit with SMG before ordering.";
  if (p.category === "PCR Consumables") return "Use the supplier thermocycler compatibility table to match well count, volume, color and skirt format to your instrument. A matching family row is preliminary guidance; confirm the exact SKU and instrument block before ordering.";
  if (p.category === "Extraction Consumables") return "Confirm the instrument model, extraction head, plate height, well geometry and protocol. A similar plate or comb format alone does not confirm fit. SMG can request exact SKU matching from the supplier.";
  if (p.category === "Manual Pipette Tips") return "Confirm pipette make, model, nominal volume and tip fit. Universal tip labeling does not guarantee fit on every pipette; request matching information or samples before committing to a bulk order.";
  return "Confirm dimensions, material, handling requirements and assay or equipment compatibility before ordering. Contact SMG for SKU-specific technical details that are not shown in the listing.";
}
const dimensions: Record<string, string> = {
  "CRAF300-H-TP-P": "Tip length 60.0 mm (catalog p. 9).",
  "CRAF1000-H-TP-P": "Tip length 95.0 mm (catalog p. 9).",
  "CRAF250-B-TP": "Tip length 51.2 mm (catalog p. 10).",
  "CRAF1000-B-TP": "Tip length 51.2 mm (catalog p. 10).",
  "CRDP22-SV-9": "127.5 x 85.5 x 41.6 mm, length x width x height (catalog p. 25).",
  "CRCM-TC-96": "127.3 x 85.3 x 42.9 mm, length x width x height (catalog p. 27).",
  "CRPC04-3-TP-FS": "127.7 x 86.5 x 9.7 mm, length x width x height (catalog p. 29).",
  "CRPC10-9-TP-FS": "127.8 x 86.5 x 15.6 mm, length x width x height (catalog p. 29).",
  "CRPC20-9-TP-HS": "126.3 x 86.5 x 20.5 mm, length x width x height (catalog p. 32).",
  "CRPC-SF-S": "137 x 80 mm, length x width (catalog p. 74).",
  "CRTP-5-S": "Length 342 mm (catalog p. 53).",
  "CRTP-10-S": "Length 345 mm (catalog p. 53).",
  "CRTP-25-S": "Length 313 mm (catalog p. 54).",
  "CRTP-50-S": "Length 353 mm (catalog p. 54).",
};
export function technicalStatus(p: StoreProduct) {
  let material = "Request the supplier technical sheet for material confirmation.";
  if (["Manual Pipette Tips", "Robotic Pipette Tips", "PCR Consumables", "Extraction Consumables", "ELISA Plates"].includes(p.category) || p.supplierSku === "CRSCT200-S-TP-A") material = "Polypropylene (PP), supplier catalog product-family specification. Confirm the current SKU grade with your quote.";
  if (p.supplierSku === "CRBS03-TP-S") material = "Low-density polyethylene (LDPE), supplier catalog pp. 19-20.";
  if (p.supplierSku?.startsWith("CRTP-")) material = "Polystyrene (PS), supplier catalog p. 52.";
  if (p.supplierSku === "CRDP-SC-9") material = "Silicone, supplier catalog p. 74.";
  let sterility = "Sterility is not confirmed for this SKU in the available documents. Request the required grade and lot certificate before ordering.";
  if (p.supplierSku === "CRBS03-TP-S") sterility = "Supplier catalog marks this SKU as individually packaged and sterilized (p. 20). Request the lot-specific certificate and method.";
  if (p.supplierSku === "CRSCT200-S-TP-A") sterility = "Supplier catalog marks this SKU as sterilized (p. 66). Packaging quantity remains subject to confirmation; request the lot certificate.";
  if (p.sku === "SMG-ELP-0500-050") sterility = "Listed as sterile in the existing SMG specification; request the lot-specific certificate and sterilization details.";
  return { material, dimensions: dimensions[p.supplierSku || ""] || "Exact dimensions are not confirmed in the available documents. Request the supplier drawing before assessing fit.", sterility };
}

export const unitPrice = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: amount < 1 ? 4 : 2 }).format(amount);
