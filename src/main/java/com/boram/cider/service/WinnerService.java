package com.boram.cider.service;

import java.util.List;

import com.boram.cider.domain.EntryVO;

public interface WinnerService {
	public List<EntryVO> listWinner() throws Exception;
	public void updateWinner(EntryVO entry) throws Exception;
}
