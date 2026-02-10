import React from 'react';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
    fontFamily: "'Space Mono', 'Courier New', monospace",
  } as React.CSSProperties,
  card: {
    width: 1116,
    height: 546,
    backgroundColor: '#ffffff',
    border: '6px solid #000000',
    borderRadius: 16,
    padding: 42,
    boxSizing: 'border-box',
    display: 'flex',
    gap: 40,
  } as React.CSSProperties,
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } as React.CSSProperties,
  tag: {
    display: 'inline-flex',
    width: 'fit-content',
    backgroundColor: '#22c55e',
    border: '5px solid #000000',
    borderRadius: 12,
    padding: '16px 24px',
    fontFamily: "'Archivo Black', 'Arial Black', sans-serif",
    fontSize: 40,
    lineHeight: 1,
    letterSpacing: 1,
  } as React.CSSProperties,
  panel: {
    backgroundColor: '#fff7ed',
    border: '5px solid #000000',
    borderRadius: 14,
    padding: 28,
    height: 298,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  phrase: {
    fontSize: 36,
    lineHeight: 1.25,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
  } as React.CSSProperties,
  stats: {
    fontSize: 30,
    lineHeight: 1.2,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
  } as React.CSSProperties,
  button: {
    display: 'inline-flex',
    width: 'fit-content',
    backgroundColor: '#ef4444',
    border: '5px solid #000000',
    borderRadius: 10,
    padding: '18px 28px',
    fontFamily: "'Archivo Black', 'Arial Black', sans-serif",
    fontSize: 34,
    lineHeight: 1,
  } as React.CSSProperties,
  url: {
    marginTop: 'auto',
    fontSize: 28,
    fontWeight: 700,
    color: '#000000',
  } as React.CSSProperties,
  lockWrap: {
    width: 220,
    height: 312,
    backgroundColor: '#e0f2fe',
    border: '5px solid #000000',
    borderRadius: 16,
    position: 'relative',
    alignSelf: 'center',
    marginTop: 90,
  } as React.CSSProperties,
  lockBody: {
    position: 'absolute',
    left: 56,
    top: 88,
    width: 108,
    height: 132,
    backgroundColor: '#fef3c7',
    border: '5px solid #000000',
    borderRadius: 12,
  } as React.CSSProperties,
  shackle: {
    position: 'absolute',
    left: 72,
    top: 58,
    width: 76,
    height: 56,
    border: '12px solid #000000',
    borderBottom: 'none',
    borderRadius: '28px 28px 0 0',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  keyholeDot: {
    position: 'absolute',
    left: 96,
    top: 140,
    width: 28,
    height: 28,
    backgroundColor: '#000000',
    borderRadius: '50%',
  } as React.CSSProperties,
  keyholeStem: {
    position: 'absolute',
    left: 102,
    top: 164,
    width: 16,
    height: 44,
    backgroundColor: '#000000',
    borderRadius: 8,
  } as React.CSSProperties,
};

export const OgImageCard = () => {
  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.left}>
          <div style={styles.tag}>SECURE PASSPHRASE GEN</div>
          <div style={styles.panel}>
            <p style={styles.phrase}>wolf-candle-circuit-ember</p>
            <p style={styles.stats}>entropy: high | words: 4</p>
            <div style={styles.button}>GENERATE</div>
          </div>
          <div style={styles.url}>passphrase.sdad.pro</div>
        </div>

        <div style={styles.lockWrap}>
          <div style={styles.lockBody} />
          <div style={styles.shackle} />
          <div style={styles.keyholeDot} />
          <div style={styles.keyholeStem} />
        </div>
      </div>
    </div>
  );
};
