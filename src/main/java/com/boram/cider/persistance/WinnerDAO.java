package com.boram.cider.persistance;

import java.util.List;

import com.boram.cider.domain.EntryVO;

public interface WinnerDAO {
	public List<EntryVO> listWinner() throws Exception;
	public void updateWinner(EntryVO entry) throws Exception;
}
