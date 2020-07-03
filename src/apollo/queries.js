import gql from "graphql-tag";

export const GET_USERS_MUTATION = gql`
  query {
    getUsers {
      _id
      name
      email
      type
      phone
    }
  }
`;

export const GET_JUDGE_QUERY = gql`
  query {
    getJudges {
      name
      bio
      _id
    }
  }
`;

export const GET_AUTH = gql`
  query Me($token: String) {
    me(token: $token) {
      email
      phone
      name
      isActive
      _id
      role
    }
  }
`;

export const AUTH = gql`
  {
    auth {
      email
      phone

      isActive
      _id
      role
    }
  }
`;

export const GET_REPORTS_QUERY = gql`
  {
    getReports {
      _id
      court
      suit_no
      title
      appellant
      respondent
      c_appellant
      c_respondent
      appeal
      issues_of_law
      summary
      determination
      date
      judges
      vol
      year
      ratios
      cases_cited
      books_cited
      judgement
      likes
      caseRef
      slug
      createdAt
      comments {
        _id
        content
        likes
        createdAt
        author {
          name
          _id
        }
      }
    }
  }
`;

export const GET_REPORT_QUERY = gql`
  query GetReport($slug: String) {
    getReport(slug: $slug) {
      _id
      court
      suit_no
      title
      appellant
      respondent
      c_appellant
      c_respondent
      appeal
      issues_of_law
      summary
      determination
      date
      judges
      vol
      year
      ratios
      cases_cited
      books_cited
      judgement
      likes
      caseRef
      slug
      createdAt
      comments {
        _id
        content
        likes
        createdAt
        author {
          name
          _id
        }
      }
    }
  }
`;

// Practice note

export const GETNOTECATS_QUERY = gql`
  {
    getNoteCats {
      _id
      name
      slug
    }
  }
`;

export const GETNOTES_QUERY = gql`
  {
    getNotes {
      _id
      topic
      category {
        _id
        name
      }
      questions {
        _id
      }
    }
  }
`;

export const GETNOTE_QUERY = gql`
  query GetNote($_id: ID) {
    getNote(_id: $_id) {
      _id
      questions {
        _id
        question
        answer
      }
    }
  }
`;

export const GET_NOTES_BY_CAT = gql`
  query GetNoteByCat($category: String) {
    getNotesByCat(category: $category) {
      _id
      topic
    }
  }
`;

export const GET_NOTE_CAT = gql`
  query GetNoteCat($slug: String) {
    getNoteCat(slug: $slug) {
      _id
      name
      notes {
        _id
        slug
        topic
      }
    }
  }
`;

export const GET_NOTE_QUESTIONS = gql`
  {
    getNoteQuestions {
      note_id
      question
      answer
    }
  }
`;
