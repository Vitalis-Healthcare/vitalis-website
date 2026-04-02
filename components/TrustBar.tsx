interface TrustItem {
  label: string
  value: string
}

interface TrustBarProps {
  items?: TrustItem[]
}

const defaultItems: TrustItem[] = [
  { label: 'MDH OHCQ Licensed', value: 'RSA Level 3 · License #3879R' },
  { label: 'Regulated by', value: 'Maryland Dept. of Health' },
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
