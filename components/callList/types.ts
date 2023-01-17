

export interface IALLCALLS {
  paginatedCalls: IQCALLS;
}

export interface IQCALLS {
  nodes: ICALLS[];
}



export interface ICALLS {
  node: {
    id: String;
    direction: String;
    from: String;
    to: String;
    duration: number | String;
    via: String;
    is_archived: Boolean;
    call_type: String;
    created_at: String;
  }[];
}
