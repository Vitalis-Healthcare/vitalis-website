interface TrustItem {
  label: string
  value: string
}

interface TrustBarProps {
  items?: TrustItem[]
}

const defaultItems: TrustItem[] = [
  { label: 'MD License', value: 'OHCQ #3879R' },
  { label: 'Certified', value: 'Joint Commission Gold Seal' },
  { label: 'Network', value: 'CareScout Approved' },
  { label: 'Contract', value: 'BCHD · Montgomery County' },
  { label: 'Payment', value: 'VA · Medicaid · LTC · Private Pay' },
  { label: 'Available', value: '24 Hours · 7 Days' },
]

export default function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <div className="trust-bar">
      {items.map((item, i) => (
        <div className="ti" key={i}>
          <div className="ti-lbl">{item.label}</div>
          <div className="ti-val">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
