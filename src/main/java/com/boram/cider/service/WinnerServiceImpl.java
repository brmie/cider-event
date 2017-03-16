package com.boram.cider.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.boram.cider.domain.EntryVO;
import com.boram.cider.persistance.WinnerDAO;

@Service
public class WinnerServiceImpl implements WinnerService {
	
	@Inject
	private WinnerDAO dao;
	
	@Override
	public List<EntryVO> listWinner() throws Exception {
		return dao.listWinner();
	}

	@Override
	public void updateWinner(EntryVO entry) throws Exception {
		dao.updateWinner(entry);
	}

}
