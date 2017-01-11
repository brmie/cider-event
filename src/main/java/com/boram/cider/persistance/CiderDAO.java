package com.boram.cider.persistance;

import java.util.List;

import com.boram.cider.domain.EntryVO;

public interface CiderDAO {
	public List<EntryVO> listEntry() throws Exception;
	public void insertEntry(EntryVO entry) throws Exception;
	public EntryVO selectEntry(int entry_no) throws Exception;
	public int uniqueEmail(String entry_email) throws Exception;
}
