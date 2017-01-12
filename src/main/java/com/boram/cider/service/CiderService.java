package com.boram.cider.service;

import java.util.List;

import com.boram.cider.domain.EntryVO;

public interface CiderService {
	public List<EntryVO> listEntry() throws Exception;
	public void insertEntry(EntryVO entry) throws Exception;
	public String selectMelody(int entry_no) throws Exception;
	public String uniqueEmail(String entry_email) throws Exception;
}
