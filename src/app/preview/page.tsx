"use client";
import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import Card from "@/components/ui/Card/Card";
import Icon from "@/components/ui/Icon/Icon";
import Modal from "@/components/ui/Modal/Modal";
import Calendar from "@/components/ui/Calendar/Calendar";
import SpreadsheetGrid from "@/components/ui/SpreadsheetGrid/SpreadsheetGrid";
import type { ColumnDef, CellData, SortConfig } from "@/components/ui/SpreadsheetGrid/SpreadsheetGrid";
import { Star, Rocket, Gem, Target, Zap, Check, AlertTriangle, Flame, Home, Settings, ThumbsUp, Bell, Trash2, FileText, Camera, Paperclip, BarChart3, Link2, Circle } from "lucide-react";

export default function Preview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning'>('primary');
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

  // SpreadsheetGrid data
  const spreadsheetColumns: ColumnDef[] = [
    { header: 'Name', key: 'name', width: '200px' },
    { header: 'Email', key: 'email', width: '250px' },
    { header: 'Role', key: 'role', width: '150px' },
    { header: 'Status', key: 'status', width: '120px' }
  ];

  const [spreadsheetData, setSpreadsheetData] = useState<Record<string, CellData>[]>([
    {
      name: { value: 'Alice Johnson', editable: true },
      email: { value: 'alice.j@example.com', editable: true },
      role: { value: 'Developer', editable: true },
      status: { value: 'Active', editable: true }
    },
    {
      name: { value: 'Bob Smith', editable: true },
      email: { value: 'bob.smith@example.com', editable: true },
      role: { value: 'Designer', editable: true },
      status: { value: 'Active', editable: true }
    },
    {
      name: { value: 'Charlie Brown', editable: true },
      email: { value: 'charlie.b@example.com', editable: true },
      role: { value: 'Manager', editable: true },
      status: { value: 'Inactive', editable: true }
    },
    {
      name: { value: 'Diana Prince', editable: true },
      email: { value: 'diana.p@example.com', editable: true },
      role: { value: 'Developer', editable: true },
      status: { value: 'Active', editable: true }
    },
    {
      name: { value: 'Eve Martinez', editable: true },
      email: { value: 'eve.m@example.com', editable: true },
      role: { value: 'Analyst', editable: true },
      status: { value: 'Active', editable: true }
    }
  ]);

  // Separate sort states for each grid
  const [sortConfigPrimary, setSortConfigPrimary] = useState<SortConfig | null>(null);
  const [sortConfigSuccess, setSortConfigSuccess] = useState<SortConfig | null>(null);
  const [sortConfigDanger, setSortConfigDanger] = useState<SortConfig | null>(null);
  const [sortConfigSmall, setSortConfigSmall] = useState<SortConfig | null>(null);
  const [sortConfigMedium, setSortConfigMedium] = useState<SortConfig | null>(null);
  const [sortConfigLarge, setSortConfigLarge] = useState<SortConfig | null>(null);
  const [sortConfigMain, setSortConfigMain] = useState<SortConfig | null>(null);
  const [sortConfigReadOnly, setSortConfigReadOnly] = useState<SortConfig | null>(null);

  const handleCellChange = (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...spreadsheetData];
    newData[rowIndex][columnKey].value = value;
    setSpreadsheetData(newData);
    console.log(`Cell updated: Row ${rowIndex}, Column ${columnKey}, New value: ${value}`);
  };

  const openModal = (variant: typeof modalVariant, size: typeof modalSize = 'md') => {
    setModalVariant(variant);
    setModalSize(size);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <section>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Typography & Theme Showcase</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', marginBottom: '2rem' }}>
          This page demonstrates our custom theme with beautiful typography pairing. Headings use the elegant Playfair Display serif font, while body text uses the clean and modern Rubik sans-serif font.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Design System Colors</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '500px' }}>
          Our theme features a purple primary color with carefully chosen complementary colors for success, warning, and danger states. The system automatically adapts between light and dark modes.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Interactive Components</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Our button components showcase the theme colors in action with hover effects and focus states.
        </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button variant="primary" onClick={() => console.log('Primary clicked')}>
          Primary Button
        </Button>
        
        <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
          Secondary Button
        </Button>
        
        <Button variant="success" onClick={() => console.log('Success clicked')}>
          Success Button
        </Button>
        
        <Button variant="warning" onClick={() => console.log('Warning clicked')}>
          Warning Button
        </Button>
        
        <Button variant="danger" onClick={() => console.log('Danger clicked')}>
          Danger Button
        </Button>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Disabled States</h3>
      <p style={{ marginBottom: '1rem', maxWidth: '400px' }}>
        All button variants maintain consistent styling when disabled, with reduced opacity for clear visual feedback.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button variant="primary" disabled>
          Primary Disabled
        </Button>
        
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
        
        <Button variant="success" disabled>
          Success Disabled
        </Button>
        
        <Button variant="warning" disabled>
          Warning Disabled
        </Button>
        
        <Button variant="danger" disabled>
          Danger Disabled
        </Button>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Examples</h3>
      <p style={{ marginBottom: '1rem', maxWidth: '400px' }}>
        Real-world button implementations showing different types and interactive behaviors.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" type="submit">
          Submit Form
        </Button>
        
        <Button variant="secondary" type="reset">
          Reset Form
        </Button>
        
        <Button variant="success" onClick={() => alert('Changes saved!')}>
          Save Changes
        </Button>
        
        <Button variant="warning" onClick={() => confirm('Are you sure you want to proceed?')}>
          Proceed with Caution
        </Button>
        
        <Button variant="danger" onClick={() => confirm('This action cannot be undone. Continue?')}>
          Delete Account
        </Button>
      </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Avatar Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Display user initials with customizable sizes and color variants for profiles and user identification.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar name="John Doe" size="sm" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Small</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar name="Jane Smith" size="md" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Medium</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar name="Bob Wilson" size="lg" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Large</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar name="Alice Johnson" size="xl" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>X-Large</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Color Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Avatar name="Primary User" variant="primary" size="lg" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Primary</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Avatar name="Secondary User" variant="secondary" size="lg" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Secondary</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Avatar name="Success User" variant="success" size="lg" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Success</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Avatar name="Gradient User" variant="gradient" size="lg" />
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Gradient</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Examples</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>User Profile</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Avatar name="Sarah Connor" size="xl" />
            <div>
              <h5 style={{ fontWeight: '600', margin: '0 0 0.25rem 0', color: 'var(--foreground)' }}>Sarah Connor</h5>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--muted)' }}>Software Engineer</p>
              <p style={{ fontSize: '0.8rem', margin: '0', color: 'var(--muted)' }}>sarah.connor@example.com</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Comment Thread</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Mike Ross', comment: 'Great article! Really helpful insights.' },
              { name: 'Rachel Green', comment: 'Thanks for sharing this. The examples were very clear.' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
                <Avatar name={item.name} size="md" variant="gradient" />
                <div>
                  <h6 style={{ fontWeight: '500', margin: '0 0 0.25rem 0', color: 'var(--foreground)' }}>{item.name}</h6>
                  <p style={{ margin: '0', color: 'var(--muted)' }}>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Team Members</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '-0.5rem' }}>
            <div style={{ display: 'flex', marginRight: '-0.5rem' }}>
              {['Alex Kim', 'Jordan Lee', 'Taylor Swift', 'Morgan Freeman'].map((name, index) => (
                <div key={index} style={{ marginLeft: index > 0 ? '-0.5rem' : '0', border: '2px solid var(--background)', borderRadius: '50%' }}>
                  <Avatar name={name} size="lg" />
                </div>
              ))}
            </div>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              backgroundColor: 'var(--muted)', 
              border: '2px solid var(--background)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '0.8rem', 
              fontWeight: '500', 
              color: 'var(--background)',
              marginLeft: '-0.5rem'
            }}>
              +3
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Card Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Flexible card containers with different variants, sizes, and interactive states.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Variants</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card variant="primary">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>Primary Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>This is a primary variant card with purple accent.</p>
          </Card>
          
          <Card variant="secondary">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary)' }}>Secondary Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Secondary variant for less prominent content.</p>
          </Card>
          
          <Card variant="success">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--success)' }}>Success Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Green variant for positive feedback.</p>
          </Card>
          
          <Card variant="warning">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--warning)' }}>Warning Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Orange variant for caution messages.</p>
          </Card>
          
          <Card variant="danger">
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--danger)' }}>Danger Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Red variant for critical information.</p>
          </Card>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Card size="sm" variant="primary">
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Small</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Compact card</p>
          </Card>
          
          <Card size="md" variant="secondary">
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Medium</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Default size card</p>
          </Card>
          
          <Card size="lg" variant="success">
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.2rem' }}>Large</h4>
            <p style={{ margin: '0' }}>Spacious card with more padding</p>
          </Card>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Interactive Cards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card variant="primary" onClick={() => alert('Primary card clicked!')}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>Clickable Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>Click me to see interaction!</p>
          </Card>
          
          <Card variant="warning" onClick={() => console.log('Warning clicked')} disabled>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--warning)' }}>Disabled Card</h4>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>This card is disabled and won't respond to clicks.</p>
          </Card>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Examples</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Feature Cards</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card variant="primary" size="lg">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Fast Performance</h5>
                <p style={{ margin: '0', color: 'var(--muted)' }}>Lightning-fast loading with optimized code and modern frameworks.</p>
              </div>
            </Card>
            
            <Card variant="success" size="lg">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Secure by Default</h5>
                <p style={{ margin: '0', color: 'var(--muted)' }}>Built-in security features and best practices for peace of mind.</p>
              </div>
            </Card>
            
            <Card variant="warning" size="lg">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎨</div>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Beautiful Design</h5>
                <p style={{ margin: '0', color: 'var(--muted)' }}>Carefully crafted components with attention to detail.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Icon Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Circular icons with different variants and sizes for displaying symbols and actions.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Icon size="sm"><Star size={16} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Small</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon size="md"><Rocket size={20} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Medium</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon size="lg"><Gem size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Large</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="primary" size="lg"><Target size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Primary</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="secondary" size="lg"><Zap size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Secondary</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="success" size="lg"><Check size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Success</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="warning" size="lg"><AlertTriangle size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Warning</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="danger" size="lg"><Flame size={24} /></Icon>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Danger</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Interactive Icons</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Icon variant="primary" size="lg" onClick={() => alert('Home clicked!')}><Home size={24} /></Icon>
          <Icon variant="secondary" size="lg" onClick={() => alert('Settings clicked!')}><Settings size={24} /></Icon>
          <Icon variant="success" size="lg" onClick={() => alert('Like clicked!')}><ThumbsUp size={24} /></Icon>
          <Icon variant="warning" size="lg" onClick={() => alert('Notification clicked!')}><Bell size={24} /></Icon>
          <Icon variant="danger" size="lg" onClick={() => alert('Delete clicked!')}><Trash2 size={24} /></Icon>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Examples</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Action Bar</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
            <Icon variant="primary" size="md"><FileText size={20} /></Icon>
            <Icon variant="secondary" size="md"><Camera size={20} /></Icon>
            <Icon variant="success" size="md"><Paperclip size={20} /></Icon>
            <Icon variant="warning" size="md"><BarChart3 size={20} /></Icon>
            <Icon variant="danger" size="md"><Link2 size={20} /></Icon>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Status Indicators</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { status: 'Online', variant: 'success' as const },
              { status: 'Away', variant: 'warning' as const },
              { status: 'Busy', variant: 'danger' as const },
              { status: 'Offline', variant: 'secondary' as const }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem' }}>
                <Icon variant={item.variant} size="sm"><Circle size={12} fill="currentColor" /></Icon>
                <span style={{ fontWeight: '500', color: 'var(--foreground)' }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Modal Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Clean, modern modal with semi-transparent backdrop, keyboard navigation, and multiple variants.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => openModal('primary')}>
            Primary Modal
          </Button>
          <Button variant="secondary" onClick={() => openModal('secondary')}>
            Secondary Modal
          </Button>
          <Button variant="success" onClick={() => openModal('success')}>
            Success Modal
          </Button>
          <Button variant="warning" onClick={() => openModal('warning')}>
            Warning Modal
          </Button>
          <Button variant="danger" onClick={() => openModal('danger')}>
            Danger Modal
          </Button>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Button onClick={() => openModal('primary', 'sm')}>
            Small Modal
          </Button>
          <Button onClick={() => openModal('primary', 'md')}>
            Medium Modal
          </Button>
          <Button onClick={() => openModal('primary', 'lg')}>
            Large Modal
          </Button>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card variant="primary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>✨ Semi-transparent backdrop</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Beautiful blur effect</p>
          </Card>
          <Card variant="secondary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>⌨️ Keyboard navigation</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Close with Escape key</p>
          </Card>
          <Card variant="success" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🎯 Click outside to close</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Intuitive interaction</p>
          </Card>
          <Card variant="warning" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>📱 Responsive design</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Works on all screen sizes</p>
          </Card>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={modalVariant}
        size={modalSize}
        title={`${modalVariant.charAt(0).toUpperCase() + modalVariant.slice(1)} Modal`}
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {modalVariant === 'primary' && '🎯'}
            {modalVariant === 'secondary' && '⚡'}
            {modalVariant === 'success' && '✅'}
            {modalVariant === 'warning' && '⚠️'}
            {modalVariant === 'danger' && '🚨'}
          </div>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
            This is a {modalVariant} modal
          </h3>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--muted)' }}>
            You can close this modal by clicking the X button, pressing the Escape key, or clicking outside the modal.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant={modalVariant} onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Calendar Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
          Interactive calendar with date selection, navigation, and customizable styling for scheduling and date picking.
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Variants</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Primary</p>
            <Calendar
              variant="primary"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              highlightedDates={[
                new Date(new Date().setDate(new Date().getDate() - 3)),
                new Date(new Date().setDate(new Date().getDate() + 5)),
                new Date(new Date().setDate(new Date().getDate() + 10))
              ]}
            />
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Success</p>
            <Calendar
              variant="success"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
          <div style={{ width: '280px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Small</p>
            <Calendar
              size="sm"
              variant="primary"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          <div style={{ width: '360px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Medium</p>
            <Calendar
              size="md"
              variant="secondary"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          <div style={{ flex: '1' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Large</p>
            <Calendar
              size="lg"
              variant="danger"
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <Card variant="primary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>📅 Date Selection</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Click to select dates</p>
          </Card>
          <Card variant="secondary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>⬅️ ➡️ Month Navigation</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Navigate between months</p>
          </Card>
          <Card variant="success" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>✨ Highlighted Dates</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Mark important dates</p>
          </Card>
          <Card variant="warning" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>⌨️ Keyboard Support</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Enter or Space to select</p>
          </Card>
          <Card variant="danger" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🚫 Date Constraints</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Min/Max date ranges</p>
          </Card>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Example: Date Range Picker</h3>
        <div style={{ maxWidth: '450px' }}>
          <Card variant="primary" size="lg">
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', textAlign: 'center' }}>Select a Date Range</h4>
            <Calendar
              variant="primary"
              size="md"
              allowRangeSelection={true}
              selectedRange={selectedRange}
              onRangeSelect={(range) => {
                setSelectedRange(range);
                console.log('Selected range:', range);
              }}
              minDate={new Date()}
              highlightedDates={[
                new Date(new Date().setDate(new Date().getDate() + 7)),
                new Date(new Date().setDate(new Date().getDate() + 14))
              ]}
            />
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--primary)/10', borderRadius: '0.5rem', textAlign: 'center' }}>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>
                Selected Range:
              </p>
              <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                {selectedRange
                  ? `${selectedRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${selectedRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  : 'Click a start date, then click an end date'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SpreadsheetGrid Component</h2>
        <p style={{ marginBottom: '1.5rem', maxWidth: '600px' }}>
          A spreadsheet-like grid component for displaying and editing tabular data with keyboard navigation and cell editing capabilities. <strong>All grids support column sorting</strong> - click any column header to sort (ascending → descending → unsorted).
        </p>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Primary</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData}
              variant="primary"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigPrimary}
              onSortChange={setSortConfigPrimary}
            />
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Success</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData}
              variant="success"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigSuccess}
              onSortChange={setSortConfigSuccess}
            />
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Danger</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData}
              variant="danger"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigDanger}
              onSortChange={setSortConfigDanger}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Small</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData.slice(0, 3)}
              variant="secondary"
              size="sm"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigSmall}
              onSortChange={setSortConfigSmall}
            />
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Medium</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData.slice(0, 3)}
              variant="primary"
              size="md"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigMedium}
              onSortChange={setSortConfigMedium}
            />
          </div>

          <div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--muted)' }}>Large</p>
            <SpreadsheetGrid
              columns={spreadsheetColumns}
              data={spreadsheetData.slice(0, 3)}
              variant="warning"
              size="lg"
              editable={true}
              onCellChange={handleCellChange}
              sortConfig={sortConfigLarge}
              onSortChange={setSortConfigLarge}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Card variant="primary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>✏️ Cell Editing</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Click cells to edit values</p>
          </Card>
          <Card variant="secondary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>⌨️ Keyboard Navigation</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Arrow keys to navigate</p>
          </Card>
          <Card variant="success" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🔢 Row Numbers</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Optional row numbering</p>
          </Card>
          <Card variant="warning" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🎨 Color Variants</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Multiple color themes</p>
          </Card>
          <Card variant="danger" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🚫 Disabled State</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Prevent user interaction</p>
          </Card>
          <Card variant="primary" size="sm">
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>↕️ Column Sorting</h4>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Sort ascending/descending</p>
          </Card>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Practical Examples</h3>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Team Directory with Sorting</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted)' }}>
            Click any cell to edit. Click column headers to sort (ascending → descending → unsorted). Changes are logged to console.
          </p>
          <SpreadsheetGrid
            columns={spreadsheetColumns}
            data={spreadsheetData}
            variant="primary"
            size="md"
            editable={true}
            onCellChange={handleCellChange}
            sortConfig={sortConfigMain}
            onSortChange={setSortConfigMain}
            showRowNumbers={true}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Read-Only View</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted)' }}>
            Non-editable grid for displaying data. Click column headers to sort.
          </p>
          <SpreadsheetGrid
            columns={spreadsheetColumns}
            data={spreadsheetData}
            variant="secondary"
            size="md"
            editable={false}
            sortConfig={sortConfigReadOnly}
            onSortChange={setSortConfigReadOnly}
            showRowNumbers={true}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Disabled Grid</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted)' }}>
            Grid in disabled state with reduced opacity.
          </p>
          <SpreadsheetGrid
            columns={spreadsheetColumns}
            data={spreadsheetData}
            variant="danger"
            size="md"
            disabled={true}
            showRowNumbers={true}
          />
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Typography Hierarchy</h2>
        <div style={{ maxWidth: '700px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Main Heading (H1)</h1>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Section Heading (H2)</h2>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Subsection Heading (H3)</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            This is regular paragraph text using Rubik. It's clean, readable, and pairs beautifully with the Playfair Display headings. The contrast between the geometric sans-serif and elegant serif creates visual interest while maintaining excellent readability.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            This is smaller text in muted color, perfect for captions or secondary information.
          </p>
        </div>
      </section>
    </div>
  );
}