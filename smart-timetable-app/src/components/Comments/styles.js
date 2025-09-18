// Styles for comment components
export const commentStyles = {
  commentContainer: {
    marginTop: 3,
    marginBottom: 3,
  },
  commentBox: {
    marginBottom: 2,
  },
  commentList: {
    maxHeight: '500px',
    overflowY: 'auto',
  },
  commentItem: {
    borderLeft: '3px solid',
    borderLeftColor: 'primary.main',
    marginBottom: 1,
    backgroundColor: 'background.paper',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  commentText: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  commentTimestamp: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  userRole: {
    marginLeft: 1,
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    backgroundColor: 'primary.light',
    color: 'primary.contrastText',
  },
};