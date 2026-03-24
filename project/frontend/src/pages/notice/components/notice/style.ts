import type { CSSProperties } from 'react';

export const style = {
  card: {
    width: 170,
    height: 170,
    border: '1px solid black',
    borderRadius: 14,
    padding: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'absolute',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  h4: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 6,
  },
  textarea: {
    maxWidth: '100%',
  },
} satisfies Record<string, CSSProperties>;
