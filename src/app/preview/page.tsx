"use client";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";

export default function Preview() {
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