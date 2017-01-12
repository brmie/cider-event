package com.boram.cider.service;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.boram.cider.domain.EntryVO;
import com.boram.cider.persistance.CiderDAO;

@Service
public class CiderServiceImpl implements CiderService {
	
	@Inject
	private CiderDAO dao;
	
	@Override
	public List<EntryVO> listEntry() throws Exception {
		return dao.listEntry();
	}

	@Override
	public void insertEntry(EntryVO entry) throws Exception {
		dao.insertEntry(entry);
	}

	@Override
	public String selectMelody(int entry_no) throws Exception {
		EntryVO entry = dao.selectEntry(entry_no);
		return entry.getEntry_melody();
	}

	@Override
	public String uniqueEmail(String entry_email) throws Exception {		
		return dao.uniqueEmail(entry_email) + "";
	}

}
